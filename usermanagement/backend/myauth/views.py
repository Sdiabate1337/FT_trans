from .serializers import UserSerializer, MatchHistorySerializer, RefreshTokensSerializer, PasswordResetConfirmSerializer, PasswordResetRequestSerializer
import hashlib
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken, UntypedToken
from rest_framework_simplejwt.exceptions import TokenError
from .models import User, MatchHistory, RefreshTokens, ResetPasswordModel
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.shortcuts import get_object_or_404, redirect
from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.core.mail import send_mail
from .tokens import email_confirmation_token
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from datetime import datetime
import jwt
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.views import APIView
from django.conf import settings
from django.http import HttpResponse
import requests
import urllib.parse
from urllib.parse import urlencode
from django.utils import timezone
from datetime import timedelta
import json
from random import randint
from django.contrib.auth.tokens import default_token_generator
from rest_framework.parsers import MultiPartParser, FormParser


def log_to_elasticsearch(message, event_type="generic"):
    url = "http://localhost:9200/pingpong_logs-000001/_doc/"
    headers = {
        "Content-Type": "application/json"
    }
    payload = {
        "@timestamp": datetime.now(timezone.utc).isoformat(),
        "message": message,
        "event": event_type
    }
    try:
        response = requests.post(url, headers=headers, data=json.dumps(payload), auth=(settings.ELK_USER, settings.ELK_USER_PASS))
        if response.status_code == 201:
            print("Log event sent successfully!")
        else:
            print(f"Failed to send log event: {response.status_code} - {response.text}")
    except Exception as e:
        print(f"Error sending log to Elasticsearch: {e}")



class CookieJWTAuthentication(BaseAuthentication):
	def authenticate(self, request):
		access_token = request.COOKIES.get('access_token')
		if not access_token:
			return None
		try :
			payload = jwt.decode(access_token, settings.SECRET_KEY, algorithms=['HS256'])
		except jwt.ExpiredSignatureError:
			raise AuthenticationFailed({'error': 'token expired'})
		except jwt.InvalidTokenError:
			raise AuthenticationFailed('Invalid token')
		try:
			user = User.objects.get(id=payload['user_id'])
		except User.DoesNotExist:
			raise AuthenticationFailed('User not found')
		return (user, None)



class AvatarUploadView(APIView):
	authentication_classes = [CookieJWTAuthentication]
	permission_classes = [IsAuthenticated]
	parser_classes = [MultiPartParser, FormParser]
	def put(self, request):
		user = request.user
		avatar_file = request.FILES.get('avatar')
		if not avatar_file:
			return Response({"error": "No file provided"}, status=status.HTTP_400_BAD_REQUEST)
		user.avatar = avatar_file
		user.external_avatar = None  # Reset external avatar if a new one is uploaded
		user.save()
		return Response({"message": "Avatar uploaded successfully"}, status=status.HTTP_200_OK)



class GoogleLogin(APIView):
	permission_classes = [AllowAny]

	def get(self, request):
		google_url = "https://accounts.google.com/o/oauth2/auth"
		redirect_uri = "http://localhost:8000/api/google_callback/"
		client_id = settings.SOCIAL_AUTH_GOOGLE_OAUTH2_KEY
		response_type = "code"
		scope = "openid email profile"

		google_auth_url = f"{google_url}?client_id={client_id}&redirect_uri={redirect_uri}&response_type={response_type}&scope={scope}"
		return Response({"url": google_auth_url}, status=status.HTTP_200_OK)



class Login42(APIView):
	permission_classes = [AllowAny]

	def get(self, request):
		redirect_uri = "http://localhost:8000/api/42_callback/"
		client_id = settings.SOCIAL_AUTH_42_OAUTH2_KEY
		state = 'random_state_string'

		google_auth_url = f"https://api.intra.42.fr/oauth/authorize?client_id={client_id}&redirect_uri={redirect_uri}&&response_type=code&scope=public&state={state}"
		return Response({"url": google_auth_url}, status=status.HTTP_200_OK)



class FacebookLogin(APIView):
	permission_classes = [AllowAny]

	def get(self, request):
		facebook_url = "https://www.facebook.com/v10.0/dialog/oauth"
		redirect_uri = "http://localhost:8000/api/facebook_callback/"
		client_id = settings.SOCIAL_AUTH_FACEBOOK_OAUTH2_KEY
		state = 'randomestring'
		scope = "email,public_profile"

		facebook_auth_url = f"{facebook_url}?client_id={client_id}&redirect_uri={redirect_uri}&state={state}&scope={scope}"
		return Response({"url": facebook_auth_url}, status=status.HTTP_200_OK)

class isTwoFA(APIView):
	authentication_classes = [CookieJWTAuthentication]
	permission_classes = [IsAuthenticated]
	def get(self, request):
		try:
			user = request.user
			if user.isTwoFA:
				return Response({'TwoFA': 'True'},status=status.HTTP_200_OK)
			return Response({'TwoFA': 'False'},status=status.HTTP_200_OK)
		except:
			return Response ({'message': 'somthing went wrong please try again later.'})

class GoogleCallback(APIView):
	permission_classes = [AllowAny]
	def get(self, request):
		code = request.GET.get('code')
		token_url = "https://oauth2.googleapis.com/token"
		token_data = {
    	        'code': code,
    	        'client_id': settings.SOCIAL_AUTH_GOOGLE_OAUTH2_KEY,
    	        'client_secret': settings.SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET,
    	        'redirect_uri': "http://localhost:8000/api/google_callback/",
    	        'grant_type': 'authorization_code',
		}

		token_response = requests.post(token_url, data=token_data)
		token_info = token_response.json()
		access_token = token_info.get('access_token')

		user_info_url = "https://www.googleapis.com/oauth2/v2/userinfo"
		user_info_response = requests.get(user_info_url, headers={
    	        'Authorization': f"Bearer {access_token}"
		})
		user_info = user_info_response.json()

		user_data = {
			'email': user_info.get('email'),
			'username' : user_info.get('name'),
			'external_avatar': user_info.get('picture'),
		}
		user = User.objects.filter(email=user_data['email']).first()
		if not user is None:
			refresh = RefreshTokens.objects.filter(user=user).first()
			token = refresh.get_access_token()
			refresh.save()
		else:
			serializer = UserSerializer(data=user_data)
			if serializer.is_valid():
				user = serializer.save()
				refresh = RefreshTokensSerializer(data={'user': user.id})
				if refresh.is_valid():
					refresh_token : RefreshTokens = refresh.save()
					user.isAuth = True
					user.authProvider = 'google'
					user.save()
					token = refresh_token.get_access_token()
				else:
					error_text = refresh.errors.get('ErrorDetail')
					error_text = urlencode({'message': str(error_text)})
					log_to_elasticsearch("google auth failed", event_type="error")
					return redirect('https://localhost/login?{error_text}')
			else:
				for field, error_list in serializer.errors.items():
					for error in error_list:
						pass
				if error is None:
					error = 'somthing went wrong'
				error_text = urlencode({'message': str(error)})
				log_to_elasticsearch("google auth failed", event_type="error")
				return redirect(f'https://localhost/login?{error_text}')
		if user.isTwoFA:
			code = str(randint(100000, 999999))
			user.TwoFACode = code
			user.TwoFA_sent_at = timezone.now()
			user.save()
			send_mail(
            	'Your 2FA code',
            	f'Hi {user.username}!\nYour verification code is {code}.',
            	'wepong10auth@gmail.com',
            	[user.email],
            	fail_silently=False,
        	)
			return redirect('https://localhost/2fa_confirmation')
		response = redirect('https://localhost/dashboard')
		response.set_cookie (
			key='access_token',
			value=token,
			httponly=True,
			secure=True,
			samesite='None',
			# max_age=60*60*24*7
		)
		log_to_elasticsearch("google auth success", event_type="google auth")
		return response



class Callback42(APIView):
	permission_classes = [AllowAny]
	def get(self, request):
		code = request.GET.get('code')
		token_url = "https://api.intra.42.fr/oauth/token"
		token_data = {
    	        'code': code,
    	        'client_id': settings.SOCIAL_AUTH_42_OAUTH2_KEY,
    	        'client_secret': settings.SOCIAL_AUTH_42_OAUTH2_SECRET,
    	        'redirect_uri': "http://localhost:8000/api/42_callback/",
    	        'grant_type': 'authorization_code',
		}
		token_response = requests.post(token_url, data=token_data)
		print(token_response)
		token_info = token_response.json()
		access_token = token_info.get('access_token')
		user_info_url = "https://api.intra.42.fr/v2/me"
		user_info_response = requests.get(user_info_url, headers={
    	        'Authorization': f"Bearer {access_token}"
		})
		user_info = user_info_response.json()
		user_data = {
			'email': user_info.get('email'),
			'username' : user_info.get('login'),
			'external_avatar': user_info.get('image', {}).get('link'),
		}
		
		user = User.objects.filter(email=user_data['email']).first()
		if not user is None:
			refresh = RefreshTokens.objects.filter(user=user).first()
			token = refresh.get_access_token()
			refresh.save()
		else:
			serializer = UserSerializer(data=user_data)
			if serializer.is_valid():
				user = serializer.save()
				refresh = RefreshTokensSerializer(data={'user': user.id})
				if refresh.is_valid():
					refresh_token : RefreshTokens = refresh.save()
					user.isAuth = True
					user.authProvider = '42'
					user.save()
					token = refresh_token.get_access_token()
				else:
					error_text = refresh.errors.get('ErrorDetail')
					error_text = urlencode({'message': str(error_text)})
					log_to_elasticsearch("42 auth failed", event_type="error")
					return redirect('https://localhost/login?{error_text}')
			else:
				for field, error_list in serializer.errors.items():
					for error in error_list:
						pass
				if error is None:
					error = 'somthing went wrong'
				error_text = urlencode({'message': str(error)})
				log_to_elasticsearch("42 auth failed", event_type="error")
				return redirect(f'https://localhost/login?{error_text}')
		if user.isTwoFA:
			code = str(randint(100000, 999999))
			user.TwoFACode = code
			user.TwoFA_sent_at = timezone.now()
			user.save()
			send_mail(
            	'Your 2FA code',
            	f'Hi {user.username}!\nYour verification code is {code}.',
            	'wepong10auth@gmail.com',
            	[user.email],
            	fail_silently=False,
        	)
			return redirect('https://localhost/2fa_confirmation')
		response = redirect('https://localhost/dashboard')
		response.set_cookie (
			key='access_token',
			value=token,
			httponly=True,
			secure=True,
			samesite='None',
			# max_age=60*60*24*7
		)
		log_to_elasticsearch("42 auth success", event_type="42 auth")
		return response
	


class FacebookCallback(APIView):
	permission_classes = [AllowAny]
	def get(self, request):
		code = request.GET.get('code')
		token_url = "https://graph.facebook.com/v17.0/oauth/access_token"
		token_data = {
    	        'client_id': settings.SOCIAL_AUTH_FACEBOOK_OAUTH2_KEY,
    	        'redirect_uri': "http://localhost:8000/api/facebook_callback/",
    	        'client_secret': settings.SOCIAL_AUTH_FACEBOOK_OAUTH2_SECRET,
    	        'code': code,
		}

		token_response = requests.post(token_url, data=token_data)
		token_info = token_response.json()
		access_token = token_info.get('access_token')
    	    # Use the access token to get user info
		picture_height = 2000
		picture_width = 2000
		user_info_url = f"https://graph.facebook.com/me?access_token={access_token}&fields=id,name,email,picture.width({picture_width}).height({picture_height})"
		user_info_response = requests.get(user_info_url, headers={
    	        'Authorization': f"Bearer {access_token}",
		})
		user_info = user_info_response.json()

		user_data = {
			'email': user_info.get('email'),
			'username' : user_info.get('name'),
			'external_avatar': user_info.get('picture', {}).get('data', {}).get('url'),
		}
		user = User.objects.filter(email=user_data['email']).first()
		if not user is None:
			refresh = RefreshTokens.objects.filter(user=user).first()
			refresh.save()
			token = refresh.get_access_token()
		else:
			serializer = UserSerializer(data=user_data)
			if serializer.is_valid():
				user = serializer.save()
				refresh = RefreshTokensSerializer(data={'user': user.id})
				if refresh.is_valid():
					refresh_token : RefreshTokens = refresh.save()
					user.isAuth = True
					user.authProvider = 'facebook'
					user.save()
					token = refresh_token.get_access_token()
				else:
					error_text = refresh.errors.get('ErrorDetail')
					error_text = urlencode({'message': str(error_text)})
					log_to_elasticsearch("facebook auth failed", event_type="error")
					return redirect('https://localhost/login?{error_text}')
			else:
				for field, error_list in serializer.errors.items():
					for error in error_list:
						pass
				if error is None:
					error = 'somthing went wrong'
				error_text = urlencode({'message': str(error)})
				log_to_elasticsearch("facebook auth failed", event_type="error")
				return redirect(f'https://localhost/login?{error_text}')
		if user.isTwoFA:
			code = str(randint(100000, 999999))
			user.TwoFACode = code
			user.TwoFA_sent_at = timezone.now()
			user.save()
			send_mail(
            	'Your 2FA code',
            	f'Hi {user.username}!\nYour verification code is {code}.',
            	'wepong10auth@gmail.com',
            	[user.email],
            	fail_silently=False,
        	)
			return redirect('https://localhost/2fa_confirmation')
		response = redirect('https://localhost/dashboard')
		response.set_cookie (
			key='access_token',
			value=token,
			httponly=True,
			secure=True,
			samesite='None',
			# max_age=60*60*24*7
		)
		log_to_elasticsearch("google auth success", event_type="facbook auth")
		return response



class CheckAuthentication(APIView):
	authentication_classes = [CookieJWTAuthentication]
	permission_classes = [IsAuthenticated]
	def get(self, request):
		return Response({'authenticated': True}, status=status.HTTP_200_OK)

from django.http import JsonResponse

def activate(request, uidb64,token):
	try:
		uid = force_str(urlsafe_base64_decode(uidb64))
		user = User.objects.get(pk=uid)
		print('inside try')
	except (TypeError, ValueError, OverflowError, User.DoesNotExist):
		user = None
		print('first exept')
	if user is not None and email_confirmation_token.check_token(user, token):
		user.is_email_confirmed = True
		user.save()
		print('inside first condition')
		log_to_elasticsearch("email confirmation success", event_type="email confirmation")
		return JsonResponse({'messages' : 'email confirmed successfuly'}, status=status.HTTP_200_OK)
	else:
		print('inside else condition')
		log_to_elasticsearch("email confirmation failed", event_type="error")
		return JsonResponse({'error' : 'email activation is invalid'}, status=status.HTTP_400_BAD_REQUEST)



def hash_password(password):
	password_bytes = password.encode('utf-8')
	sha256 = hashlib.sha256()
	sha256.update(password_bytes)
	hashed_password = sha256.hexdigest()
	return hashed_password



class refreshAccessToken(APIView):
	def post(self,request):
		try:
			access_token = request.COOKIES.get('access_token')
			if not access_token:
				return Response({'error': 'invalide refresh token'}, status=status.HTTP_400_BAD_REQUEST)
			payload = jwt.decode(access_token, settings.SECRET_KEY, algorithms=['HS256'], options={'verify_exp': False})
			user_id = payload.get('user_id')
			if not user_id:
				return Response({'error': 'invalide refresh token'}, status=status.HTTP_400_BAD_REQUEST)
			user = User.objects.get(id=user_id)
			token: RefreshTokens = RefreshTokens.objects.get(user=user)
			access_token = token.refresh_access_token()
			return Response({'access': access_token}, status=status.HTTP_200_OK)
		except:
			return Response({'error': 'invalide refresh token'}, status=status.HTTP_400_BAD_REQUEST)


class is_email_confirmed(APIView):
	authentication_classes = [CookieJWTAuthentication]
	permission_classes = [IsAuthenticated]
	def get(self, request):
		user : User = request.user
		if user.is_email_confirmed:
			return Response({"confirmed" : True},status=status.HTTP_200_OK)
		return Response({"confirmed" : False},status=status.HTTP_200_OK)



class loginUser(APIView):
	def post(self, request):
		try:
			username = request.data['username']
			password = request.data['password']
			user = User.objects.filter(username=username).first()
		except User.DoesNotExist:
			log_to_elasticsearch("login fail", event_type="error")
			return Response({'error': 'user not found'}, status=status.HTTP_404_NOT_FOUND)
		except Exception as e:
			log_to_elasticsearch("login fail", event_type="error")
			return Response({'error': 'username and password fields are required'}, status=status.HTTP_400_BAD_REQUEST)
		if not user:
			log_to_elasticsearch("login fail", event_type="error")
			return Response({'error': 'invalide username.'}, status=status.HTTP_401_UNAUTHORIZED)
		if user.check_password(hash_password(password)):
			if user.isTwoFA:
				code = str(randint(100000, 999999))
				user.TwoFACode = code
				user.TwoFA_sent_at = timezone.now()
				user.save()
				send_mail(
            		'Your 2FA code',
            		f'Hi {user.username}!\nYour verification code is {code}.',
            		'wepong10auth@gmail.com',
            		[user.email],
            		fail_silently=False,
        		)
				return Response({'2fa_required': True}, status=status.HTTP_200_OK)
			refresh = RefreshTokens.objects.filter(user=user).first()
			if refresh is None:
				refresh_token = RefreshTokensSerializer(data={'user':user.id})
				if refresh_token.is_valid():
					refresh = refresh_token.save()
			refresh.save()
			response = Response({"access": refresh.get_access_token(), "refresh" : refresh.token, "id": user.id}, status=status.HTTP_201_CREATED)
			response.set_cookie (
				key='access_token',
				value=refresh.get_access_token(),
				httponly=True,
				secure=True,
				samesite='None',
				# max_age=60*60*24*7
			)
			log_to_elasticsearch("login success", event_type="login")
			return response
		log_to_elasticsearch("login fail", event_type="error")
		return Response({'error': 'incorrect password.'}, status=status.HTTP_401_UNAUTHORIZED)

class logoutUser(APIView):
	authentication_classes = [CookieJWTAuthentication]
	permission_classes = [IsAuthenticated]
	def post(self, request):
		try:
			# user = request.user
			# refresh_token = RefreshTokens.objects.get(user=user)
			# token = RefreshToken(refresh_token.token)
			# token.blacklist()
			# refresh_token.delete()
			log_to_elasticsearch("logout success", event_type="logout")
			response = Response ({'message': 'logout successful.'} , status=status.HTTP_200_OK)
			response.set_cookie (
				key='access_token',
				value='',
				expires=timezone.now() - timedelta(days=1),
				httponly=True,
				secure=True,
				samesite='None',
						# max_age=60*60*24*7
			)
			# response.delete_cookie('access_token')
			return response
		except Exception as e:
			return Response ({'error':'invalide request'},status=status.HTTP_400_BAD_REQUEST)



class registerUser(APIView):
	def post(self, request):
		serializer = UserSerializer(data=request.data)
		if serializer.is_valid():
			if serializer.validated_data['password'] == request.data['passwordConfirmation']:
				if User.objects.filter(username=serializer.validated_data['username']).exists():
					log_to_elasticsearch("register fail", event_type="error")
					return Response({'error': 'username is already in use.'}, status=status.HTTP_400_BAD_REQUEST)
				if User.objects.filter(username=serializer.validated_data['email']).exists():
					log_to_elasticsearch("register fail", event_type="error")
					return Response({'error': 'email is already in use.'}, status=status.HTTP_400_BAD_REQUEST)
				user = serializer.save()
				user.password = hash_password(serializer.validated_data['password'])
				data = {
					'user': user.id
				}
				refresh = RefreshTokensSerializer(data=data)
				if refresh.is_valid():
					refresh_token: RefreshTokens = refresh.save()
					user.save()
					response = Response({"access": refresh_token.get_access_token(), "refresh" : refresh_token.token}, status=status.HTTP_201_CREATED)
					response.set_cookie (
						key='access_token',
						value=refresh_token.get_access_token(),
						httponly=True,
						secure=True,
						samesite='None',
						# max_age=60*60*24*7
					)
					log_to_elasticsearch(f"new user registred named {user.username}", event_type="regitration")
					return response
				else:
					log_to_elasticsearch("register fail", event_type="error")
					return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
			else:
				log_to_elasticsearch("register fail", event_type="error")
				return Response({'error': 'passwords do not match!'}, status=status.HTTP_400_BAD_REQUEST)
		log_to_elasticsearch("register fail", event_type="error")
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class setup_email_2fa(APIView):
	authentication_classes = [CookieJWTAuthentication]
	permission_classes = [IsAuthenticated]
	def post(self,request):
		user : User = request.user
		if user is None:
			return Response({'error': 'user not found'}, status=status.HTTP_404_NOT_FOUND)
		# if not user.isTwoFA:
		user.isTwoFA = not user.isTwoFA
		user.save()
		log_to_elasticsearch("enabling 2fa" if user.isTwoFA else "disabling 2fa", event_type="2fa")
		return Response({'message': 'email 2fa enabled successfully.' if user.isTwoFA else 'email 2fa disabled successfully.'}, status=status.HTTP_200_OK)



class confirm_email_2fa(APIView):
	def post(self,request):
		username = request.data.get('username')
		code = request.data.get('code')
		user = User.objects.filter(username=username).first()
		if user is None:
			return Response({'error': 'user not found'}, status=status.HTTP_404_NOT_FOUND)
		if user.TwoFACode == code and timezone.now() - user.TwoFA_sent_at <= timedelta(minutes=5):
			refresh = RefreshTokens.objects.filter(user=user).first()
			if refresh is None:
				refresh_token = RefreshTokensSerializer(data={'user':user.id})
				if refresh_token.is_valid():
					refresh = refresh_token.save()
					refresh.save()
					token = refresh.get_access_token()
			else:
				refresh.save()
				token = refresh.get_access_token()
			response = Response({'message': '2fa confirmed successfully'},status=status.HTTP_201_CREATED)
			response.set_cookie(
				key='access_token',
				value=token,
				httponly=True,
				secure=True,
				samesite='None',
				# max_age=60*60*24*7
			)
			log_to_elasticsearch("2fa confirmation", event_type="2fa")
			return response
		log_to_elasticsearch("2fa fail", event_type="error")
		return Response({'error':'invalide or expired code'}, status=status.HTTP_401_UNAUTHORIZED)



class confirmEmail(APIView):
	authentication_classes = [CookieJWTAuthentication]
	permission_classes = [IsAuthenticated]
	def get(self,request):
		try:
			user: User = request.user
			if user.is_email_confirmed:
				return Response({'error': 'email already confirmed.'}, status=status.HTTP_400_BAD_REQUEST)
			current_site = get_current_site(request)
			mail_subject = 'Email Confirmation'
			token = email_confirmation_token.make_token(user)
			uid = urlsafe_base64_encode(force_bytes(user.pk))
			message = f"""Hi {user.username},
			Thank you for registering. Please click the link below to confirm your email:
						http://{current_site}/api/users/activate/{uid}/{token}/ Activate your account"""
			send_mail(mail_subject, message, 'wepong10auth@gmail.com', [user.email])
			return Response({'message': 'email confirmation sent successfully.'}, status=status.HTTP_200_OK)
		except Exception as e:
			return Response({'error' : 'invalide request'}, status=status.HTTP_400_BAD_REQUEST)



class updateUsername(APIView):
	authentication_classes = [CookieJWTAuthentication]
	permission_classes = [IsAuthenticated]
	def put(self, request):
		try:
			user = request.user
			newUsername = request.data['newUsername']
			data = {
				'username' : newUsername,
			}
			serializer = UserSerializer(user, data=data, partial=True)
			if serializer.is_valid():
				serializer.save()
				return Response(serializer.data, status=status.HTTP_200_OK)
			else:
				return Response({'message': "username already in use."}, status=status.HTTP_400_BAD_REQUEST)
		except:
			return Response({'message' : 'somthing went wrong please try again later.'}, status=status.HTTP_400_BAD_REQUEST)



class deleteUser(APIView):
	authentication_classes = [CookieJWTAuthentication]
	permission_classes = [IsAuthenticated]
	def delete(self, request):
		user = request.user
		try:
			user.delete()
		except:
			return Response(status=status.HTTP_404_NOT_FOUND)
		log_to_elasticsearch("user deletion", event_type="user deletion")
		return Response(status=status.HTTP_204_NO_CONTENT)



class changePassword(APIView):
	authentication_classes = [CookieJWTAuthentication]
	permission_classes = [IsAuthenticated]
	def post(self,request):
		user: User = request.user
		if user.isAuth:
			return Response({'message' : f"this user is authenticated with {user.authProvider}, there is no password to change."})
		password = request.data['password']
		if user.check_password(hash_password(password)):
			newPassword = request.data['newPassword']
			newPasswordConfirmation = request.data['newPasswordConfirmation']
			if newPassword == newPasswordConfirmation:
				if not newPassword:
					return Response({'message': 'new password is required'}, status=status.HTTP_400_BAD_REQUEST)
				user.set_password(hash_password(newPassword))
				return Response({'message': 'password changed successfully.'}, status=status.HTTP_200_OK)
			return Response({'message': 'passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)
		return Response({'message': 'password is incorrect'}, status=status.HTTP_400_BAD_REQUEST)



class ProfileById(APIView):
	authentication_classes = [CookieJWTAuthentication]
	permission_classes = [IsAuthenticated]
	def get(self, request):
		user_id = request.GET.get('friend')
		if user_id is None:
			return Response({'error': 'user_name is required'}, status=status.HTTP_400_BAD_REQUEST)
		try:
			user = User.objects.get(id=user_id)
		except User.DoesNotExist:
			return Response({'error': 'user not found'})
		data = {
			'user_name': user.username,
			'avatar' : user.absolute_photo_url(request),
			'email' : user.email,
		}
		return Response(data, status=status.HTTP_200_OK)



class ProfileByUsername(APIView):
	authentication_classes = [CookieJWTAuthentication]
	permission_classes = [IsAuthenticated]
	def post(self, request):
		username = request.data['username']
		if username is None:
			return Response({'error': 'username is required'}, status=status.HTTP_400_BAD_REQUEST)
		try:
			user = User.objects.get(username=username)
		except User.DoesNotExist:
			return Response({'error': 'user not found'},status=status.HTTP_404_NOT_FOUND)
		# if request.user == user:
		# 	return Response({'error': 'you are looking for your self'},status=status.HTTP_400_BAD_REQUEST)
		data = {
			'username': user.username,
			'avatar' : user.absolute_photo_url(request),
			'email' : user.email,
			'wins'  : user.wins,
			'loses' : user.loses
		}
		return Response(data, status=status.HTTP_200_OK)



class userProfile(APIView):
	authentication_classes = [CookieJWTAuthentication]
	permission_classes = [IsAuthenticated]
	def get(self, request):
		user = request.user
		# if not user:
		# 	return Response({'error': 'user is required.'}, status=status.HTTP_400_BAD_REQUEST)
		# user = User.objects.get(id=user.id)
		if user is None:
			return Response({'error': 'user not found.'}, status=status.HTTP_404_NOT_FOUND)
		data = {
			'username' : user.username,
			'avatar' : user.absolute_photo_url(request),
			'email' : user.email,
			'id' : user.id,
			'wallet' : user.wallet
		}
		return Response(data, status=status.HTTP_200_OK)



class friendList(APIView):
	authentication_classes = [CookieJWTAuthentication]
	permission_classes = [IsAuthenticated]
	def get(self, request):
		user : User = request.user
		if user is None:
			return Response({'error': 'user not found.'}, status=status.HTTP_404_NOT_FOUND)
		friend_list = {}
		for friend in user.friends:
			user = User.objects.get(id=friend)
			friend_list[user.id] = [user.username, user.absolute_photo_url(request)]

		data = {
			'friends' : friend_list,
		}
		return Response(data, status=status.HTTP_200_OK)



class myRequestsList(APIView):
	authentication_classes = [CookieJWTAuthentication]
	permission_classes = [IsAuthenticated]
	def get(self, request):
		user = request.user
		if user is None:
			return Response({'error': 'user not found.'}, status=status.HTTP_404_NOT_FOUND)
		data = {
			'myRequests' : user.MyRequests,
		}
		return Response(data, status=status.HTTP_200_OK)



class BlockedList(APIView):
	authentication_classes = [CookieJWTAuthentication]
	permission_classes = [IsAuthenticated]
	def get(self, request):
		user = request.user
		if user is None:
			return Response({'error': 'user not found.'}, status=status.HTTP_404_NOT_FOUND)
		data = {
			'blockedList' : user.Blocked,
		}
		return Response(data, status=status.HTTP_200_OK)



class friendRequestList(APIView):
	authentication_classes = [CookieJWTAuthentication]
	permission_classes = [IsAuthenticated]
	def get(self, request):
		user = request.user
		if user is None:
			return Response({'error': 'user not found.'}, status=status.HTTP_404_NOT_FOUND)
		data = {
			'friendsRequests' : user.friendRequests,
		}
		return Response(data, status=status.HTTP_200_OK)



class sendRequest(APIView):
	authentication_classes = [CookieJWTAuthentication]
	permission_classes = [IsAuthenticated]
	def post(self, request):
		try: 
			sender : User= request.user
			if sender is None:
				return Response({'error': 'user not found.'}, status=status.HTTP_404_NOT_FOUND)
			reciever_id = request.data['reciever_id']
			if not reciever_id:
				return Response({'error': 'Receiver id is required.'}, status=status.HTTP_400_BAD_REQUEST)
			reciever = User.objects.get(id=reciever_id)
			if sender.id == reciever_id:
				return Response({'error': 'You cannot send a friend request to yourself.'}, status=status.HTTP_400_BAD_REQUEST)
			sender.sendRequest(reciever_id)
			reciever.addFriendRequest(sender.id)
			log_to_elasticsearch("Friend request sent successfully", event_type="friend request")
			return Response({'message': 'Friend request sent successfully'},status=status.HTTP_200_OK)
		except User.DoesNotExist:
			return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
		except Exception as e:
			return Response({'error': 'already sent'}, status=status.HTTP_400_BAD_REQUEST)



class AcceptRequest(APIView):
	authentication_classes = [CookieJWTAuthentication]
	permission_classes = [IsAuthenticated]
	def post(self, request):
		try:
			reciever : User = request.user
			if reciever is None:
				return Response({'error': 'user not found.'}, status=status.HTTP_404_NOT_FOUND)
			sender_id = request.data['sender_id']
			if not sender_id:
				return Response({'error': 'Sender id is required.'}, status=status.HTTP_400_BAD_REQUEST)
			sender = User.objects.get(id=sender_id)
			if sender_id == reciever.id:
				return Response({'error': 'invalide request'}, status=status.HTTP_400_BAD_REQUEST)
			sender.DeleteRequest(reciever.id)
			sender.addFriend(reciever.id)
			reciever.DeleteFriendRequest(sender_id)
			reciever.addFriend(sender_id)
			log_to_elasticsearch("Friend request accepted successfully", event_type="accept friend request")
			return Response({'message': 'Friend request accepted successfully'},status=status.HTTP_200_OK)
		except User.DoesNotExist:
			return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
		except Exception as e:
			return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)



class DenyRequest(APIView):
	authentication_classes = [CookieJWTAuthentication]
	permission_classes = [IsAuthenticated]

	def post(self, request):
			try:
				receiver: User = request.user
				if receiver is None:
					return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

				# Extract sender_id from the request body
				sender_id = request.data.get('sender_id')
				if not sender_id:
					return Response({'error': 'Sender ID is required.'}, status=status.HTTP_400_BAD_REQUEST)

				# Verify sender exists
				try:
					sender = User.objects.get(id=sender_id)
				except User.DoesNotExist:
					return Response({'error': 'Sender not found.'}, status=status.HTTP_404_NOT_FOUND)

				if sender_id == receiver.id:
					return Response({'error': 'Invalid request.'}, status=status.HTTP_400_BAD_REQUEST)

				# Use the DeleteRequest method to remove the friend request
				try:
					receiver.DeleteFriendRequest(sender_id)
					sender.DeleteRequest(receiver.id)
				except Exception as e:
					return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

				return Response({'message': 'Friend request denied successfully.'}, status=status.HTTP_200_OK)

			except Exception as e:
				return Response({'error': 'Invalid request.'}, status=status.HTTP_400_BAD_REQUEST)
	
class removeFriend(APIView):
	authentication_classes = [CookieJWTAuthentication]
	permission_classes = [IsAuthenticated]
	def post(self, request):
		try:
			user = request.user
			friend_id = request.data.get('friend_id')
			friend = User.objects.get(id=friend_id)
			user.DeleteFriend(friend_id)
			friend.DeleteFriend(user.id)
			return Response({'message': 'friend removed successfully'}, status=status.HTTP_200_OK)
		except User.DoesNotExist:
			return Response({'error': 'User NOT found'}, status=status.HTTP_404_NOT_FOUND)
		except:
			return Response({'error': 'somthing went wrong'}, status=status.HTTP_400_BAD_REQUEST)



class DeleteRequest(APIView):
	authentication_classes = [CookieJWTAuthentication]
	permission_classes = [IsAuthenticated]
	def delete(self, request):
		try:
			sender = request.user
			if sender is None:
				return Response({'error': 'user not found.'}, status=status.HTTP_404_NOT_FOUND)
			reciever_id = request.data['reciever_id']
			if not reciever_id:
				return Response({'error': 'Receiver user_id is required.'}, status=status.HTTP_400_BAD_REQUEST)
			reciever = User.objects.get(id=reciever_id)
			if sender.id == reciever_id:
				return Response({'error': 'invalide request'}, status=status.HTTP_400_BAD_REQUEST)
			reciever.DeleteFriendRequest(sender.id)
			sender.DeleteRequest(reciever_id)
			log_to_elasticsearch("Friend request deleted successfully", event_type="friend request deleted")
			return Response({'message': 'Friend request deleted successfully'},status=status.HTTP_204_NO_CONTENT)
		except User.DoesNotExist:
			return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
		except Exception as e:
			return Response({'error': 'invalide request'}, status=status.HTTP_400_BAD_REQUEST)



class block(APIView):
	authentication_classes = [CookieJWTAuthentication]
	permission_classes = [IsAuthenticated]
	def post(self,request):
		try:
			user: User = request.user
			toBeBlocked = User.objects.get(id=request.data['id'])
			if not toBeBlocked:
				return Response({'error': 'toBeBlocked user_id is required.'}, status=status.HTTP_400_BAD_REQUEST)
			if user.id == toBeBlocked.id:
				return Response({'error': 'you cannot block yourself'}, status=status.HTTP_400_BAD_REQUEST)
			user.block(toBeBlocked.id)
			# user.DeleteFriend(toBeBlocked.id)
			# toBeBlocked.DeleteFriend(user)
			log_to_elasticsearch("user blocked successfully", event_type="block")
			return Response({'message': 'user blocked successfully'},status=status.HTTP_200_OK)
		except User.DoesNotExist:
			return Response({'error':'User not found.'}, status=status.HTTP_404_NOT_FOUND)
		except Exception as e:
			return Response({'error': str(e)},status=status.HTTP_400_BAD_REQUEST)



class unblock(APIView):
	authentication_classes = [CookieJWTAuthentication]
	permission_classes = [IsAuthenticated]
	def post(self,request):
		try:
			user: User = request.user

			toBeUnblocked = User.objects.get(id=request.data['id'])
			user.unblock(toBeUnblocked.id)
			log_to_elasticsearch("user unblocked successfully", event_type="unblock")
			return Response({'message': 'user unblocked successfully'},status=status.HTTP_204_NO_CONTENT)
		except User.DoesNotExist:
			return Response({'error': 'User not found.'},status=status.HTTP_404_NOT_FOUND)
		except Exception as e:
			return Response({'error':'invalide request.'},status=status.HTTP_400_BAD_REQUEST)

class is_blocked(APIView):
	authentication_classes = [CookieJWTAuthentication]
	permission_classes = [IsAuthenticated]
	def post(self,request):
		try:
			user = request.user
			friend = request.data.get('friend_id')
			if friend is None:
				return Response({'error' : 'friend_id is required'}, status=status.HTTP_400_BAD_REQUEST)
			return Response({'friend_id': friend, 'is_blocked': (friend in user.Blocked)}, status=status.HTTP_200_OK)
		except User.DoesNotExist:
			return Response({'error' : 'user not found'}, status=status.HTTP_404_NOT_FOUND)
		except:
			return Response({'error' : 'somthing went wrong'}, status=status.HTTP_400_BAD_REQUEST)


class is_blocked_by(APIView):
	authentication_classes = [CookieJWTAuthentication]
	permission_classes = [IsAuthenticated]
	def post(self,request):
		try:
			user = request.user
			friend_id = request.data.get('friend_id')
			if friend_id is None:
				return Response({'error' : 'friend_id is required'}, status=status.HTTP_400_BAD_REQUEST)
			friend = User.objects.get(id=friend_id)
			return Response({'user_id': user.id, 'is_blocked': (user.id in friend.Blocked)}, status=status.HTTP_200_OK)
		except User.DoesNotExist:	
			return Response({'error' : 'user not found'}, status=status.HTTP_404_NOT_FOUND)
		except:
			return Response({'error' : 'somthing went wrong'}, status=status.HTTP_400_BAD_REQUEST)

class PasswordResetRequestView(APIView):
	def post(self, request):
		print('befor ser call')
		serializer = PasswordResetRequestSerializer(data= {'email' :request.data['email'], 'password': hash_password(request.data['password'])})
		print('after ser call')
		if serializer.is_valid():
			resetPass = serializer.save()
			resetPass.save()
			log_to_elasticsearch("password reset request", event_type="password reset")
			return Response({'detail': 'Password reset link sent.'}, status=status.HTTP_200_OK)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
	

	
def PasswordResetConfirmView(request, uid, token):
	try:
		decoded_uid = force_str(urlsafe_base64_decode(uid))
		user = User.objects.get(pk=decoded_uid)
	except (TypeError, ValueError, OverflowError, User.DoesNotExist):
		user = None
	if user is not None and default_token_generator.check_token(user, token):
		resetPass = ResetPasswordModel.objects.filter(email=user.email).first()
		user.set_password(password=resetPass.password)
		resetPass.delete()
		user.save()
		send_mail(
            'Password Reset',
            f'Hi {user.username}!\nPassword Reset confirmed successfully, you can log in to WePong with your new password.',
            'wepong10auth@gmail.com',
            [user.email],
            fail_silently=False,
        )
		message_text = "Password Reset successful"
		message_text = urlencode({'message': str(message_text)})
		return redirect(f'https://localhost/login?{message_text}')
	else:
		send_mail(
            'Password Reset',
            f'Hi {user.username}!\nWe had a problem trying to reset your password, please try again later.',
            'wepong10auth@gmail.com',
            [user.email],
            fail_silently=False,
        )
		message_text = "Problem accured while trying to confirm password reset\nplease try again later."
		message_text = urlencode({'message': str(message_text)})
		return redirect(f'https://localhost/login?{message_text}')

class UpdateWalletView(APIView):
	authentication_classes = [CookieJWTAuthentication]
	permission_classes = [IsAuthenticated]
	def post(self, request, *args, **kwargs):
		user = request.user
		amount = request.data.get('amount')
		if amount is not None:
			try:
				amount = int(amount)
			except ValueError:
				return Response({"error": "Invalid amount"}, status=status.HTTP_400_BAD_REQUEST)		
			user.wallet += amount
			user.save()
		    # serializer = UserSerializer(user)
			return Response({'message': 'wallet apdated successfully'}, status=status.HTTP_200_OK)
		else:
		    return Response({"error": "Amount not provided"}, status=status.HTTP_400_BAD_REQUEST)

class GetIdByUsername(APIView):
	authentication_classes = [CookieJWTAuthentication]
	permission_classes = [IsAuthenticated]
	def post(self, request):
		try:
			username = request.data.get('username', None)
			if not username:
				return Response({'error': 'Username is required.'}, status=status.HTTP_400_BAD_REQUEST)

			user = User.objects.get(username=username)
			return Response({'id': user.id}, status=status.HTTP_200_OK)

		except User.DoesNotExist:
			return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
		except Exception as e:
			return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
		

class UpdateMatchHistory(APIView):
	authentication_classes = [CookieJWTAuthentication]
	permission_classes = [IsAuthenticated]
	def post(self, request):
		try:
			user = request.user
			match_details = request.data.get('match_details')
			winner = request.data.get('winner')
			if match_details is None:
				return Response({'error': 'match_details not provided'}, status=status.HTTP_400_BAD_REQUEST)
			if winner is None:
				return Response({'error': 'winner not provided'}, status=status.HTTP_400_BAD_REQUEST)
			if (winner == user.username):
				user.NewWin()
			else:
				user.NewLose()
			MatchHistory.objects.create(user=user, match_data=match_details)
			return Response({'message' : 'match history updates successfully'}, status=status.HTTP_200_OK)
		except User.DoesNotExist:
			return Response({'error': 'user not found'}, status=status.HTTP_404_NOT_FOUND)
		except:
			return Response({'error': 'somthing went wrong'}, status=status.HTTP_400_BAD_REQUEST)
		

class UserMatchHistory(APIView):
	authentication_classes = [CookieJWTAuthentication]
	permission_classes = [IsAuthenticated]
	def post(self, request):
		try:
			username = request.data.get('username')
			user = User.objects.get(username=username)
			matches = MatchHistory.objects.filter(user=user)
			if not matches.exists():
				return Response({'error': 'no matches found'}, status=status.HTTP_400_BAD_REQUEST)
			serializer = MatchHistorySerializer(matches, many=True)
			return Response(serializer.data, status=status.HTTP_200_OK)
		except User.DoesNotExist:
			return Response({'error': 'user not found'}, status=status.HTTP_404_NOT_FOUND)
		except:
			return Response({'error': 'somthing went wrong'}, status=status.HTTP_400_BAD_REQUEST)
