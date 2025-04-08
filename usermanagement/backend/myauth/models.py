from django.db import models
from django.utils import timezone
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import AbstractUser
# Create your models here.

# class Stats(models.Model):
# 	id = models.AutoField(primary_key=True)
# 	wins = models.IntegerField(default=0)
# 	losses = models.IntegerField(default=0)
# 	# rank = models.CharField(max_length=255, default='Unranked')
# 	userId = models.OneToOneField('User', on_delete=models.CASCADE, unique=True)
# 	createdAt = models.DateTimeField(default=timezone.now)
# 	updatedAt = models.DateTimeField(auto_now=True)

# 	def __str__(self):
# 		return f"{self.userId.username}'s Stats"




	
class ResetPasswordModel(models.Model):
	email = models.EmailField()
	password = models.CharField(max_length=255)
	def __str__(self):
		return self.email

class User (AbstractUser):
	id = models.AutoField(primary_key=True)
	email = models.EmailField(unique=True)
	is_email_confirmed = models.BooleanField(default=False)
	wallet = models.IntegerField(default=400)
	username = models.CharField(max_length=255, unique=True)
	password = models.CharField(max_length=255, null=True)
	# avatar = models.CharField(max_length=255, blank=True, null=True, default="../images/player1.png")
	avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
	external_avatar = models.URLField(max_length=500, blank=True, null=True)
	isTwoFA = models.BooleanField(default=False)
	isAuth = models.BooleanField(default=False)
	authProvider = models.CharField(max_length=255,null=True)
	# otpTwoFA = models.CharField(max_length=255, unique=True, blank=True, null=True)
	TwoFACode = models.CharField(max_length=6, null=True, blank=True)
	TwoFA_sent_at = models.DateTimeField(null=True,blank=True)
	userStatus = models.CharField(max_length=255, null=True)
	# userMatchHistoryId = models.OneToOneField('MatchHistory', on_delete=models.SET_NULL, null=True, blank=True)
	Blocked = models.JSONField(default=list,blank=True,null=True)
	friends = models.JSONField(default=list,blank=True,null=True)
	friendRequests = models.JSONField(default=list,blank=True,null=True)
	MyRequests = models.JSONField(default=list, blank=True, null=True)
	wins = models.IntegerField(default=0)
	loses = models.IntegerField(default=0)
	createdAt = models.DateTimeField(default=timezone.now)
	updatedAt = models.DateTimeField(auto_now=True)

	def __str__(self):
		return self.username
	
	def absolute_photo_url(self, request=None):
		if request and self.avatar:
			return request.build_absolute_uri(self.avatar.url)  # Absolute URL
		if self.external_avatar:
			return self.external_avatar
		return request.build_absolute_uri('/media/avatars/player1.png')
	
	def update_feilds(self, **kwargs):
		for field, value in kwargs.items():
			if hasattr(self, field):
				setattr(self, field, value)
		self.save()
	
	def NewWin(self):
		self.wins = self.wins + 1
		self.save()

	def NewLose(self):
		self.loses = self.loses + 1
		self.save()

	def set_password(self, password):
		self.password = password
		self.save()
	
	def check_password(self, password):
		if self.password == password:
			return True
		return False
	
	def addFriend(self, friend_id):

		if not isinstance(self.friends, list):
			self.friends = list(self.friends or [])
		if friend_id not in self.friends:
			self.friends.append(friend_id)
			self.save()
		else:
			raise Exception("already a friend")

	def DeleteFriend(self, friend_id):

		if friend_id in self.friends:
			self.friends.remove(friend_id)
			self.save()
		else:
			raise Exception("not a friend")
	
	def addFriendRequest(self, sender_id):

		if sender_id in self.friends:
			raise Exception("already a friend")
		if not isinstance(self.friendRequests, list):
			self.friendRequests = list(self.friendRequests or [])
		if sender_id not in self.friendRequests:
			self.friendRequests.append(sender_id)
			self.save()
	
	def DeleteFriendRequest(self, sender_id):
		if sender_id in self.friendRequests:
			self.friendRequests.remove(sender_id)
			self.save()
		else:
			raise Exception("request dose not exist 1")
	
	
	def block(self, user_id):
		
		if not isinstance(self.Blocked, list):
			self.Blocked = list(self.Blocked or [])
		if user_id not in self.Blocked:
			self.Blocked.append(user_id)
			self.save()
		else:
			raise Exception("already blocked")
		
	def unblock(self, user_id):
		if user_id in self.Blocked:
			self.Blocked.remove(user_id)
			self.save()
		else:
			raise Exception("not blocked")

	def sendRequest(self, user_id):
		# Ensure MyRequests is a list
		if not isinstance(self.MyRequests, list):
			self.MyRequests = list(self.MyRequests or [])

		# Check if the user_id is already in MyRequests
		if user_id in self.MyRequests:
			raise Exception("Friend request already sent")

		# Append the user_id and save
		self.MyRequests.append(user_id)
		self.save()
		print(self.MyRequests)

	def DeleteRequest(self, user_id):
		if user_id in self.MyRequests:
			self.MyRequests.remove(user_id)
			self.save()
		else:
			raise Exception("request dose not exist 2")


class MatchHistory(models.Model):
	id = models.AutoField(primary_key=True)
	# userId = models.OneToOneField('User', related_name='MatchHistories',on_delete=models.CASCADE, unique=True)
	match_data = models.JSONField()
	user = models.ForeignKey(User, related_name='match_histories', on_delete=models.CASCADE)

	def __str__(self):
		return f"Match history for user {self.user}"


class RefreshTokens(models.Model):
	token = models.TextField()
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	
	def __str__(self):
		return self.token

	def save(self, *args, **kwargs):
		print("############### saved call #############")
		self.token = str(RefreshToken.for_user(self.user))
		super().save(*args, **kwargs)

	def updateToken(self):
		self.token = str(RefreshToken.for_user(self.user))
	
	def get_access_token(self):
		refresh_token = RefreshToken(self.token)
		return str(refresh_token.access_token)
	
	def refresh_access_token(self):
		try:
			refresh_token = RefreshToken(self.token)
			return str(refresh_token.access_token)
		except:
			raise Exception('invalide refresh token')