from rest_framework import serializers
from .models import User, MatchHistory, RefreshTokens, ResetPasswordModel
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = '__all__'

class MatchHistorySerializer(serializers.ModelSerializer):
	class Meta:
		model = MatchHistory
		fields = ['id', 'match_data', 'user']

class RefreshTokensSerializer(serializers.ModelSerializer):
	class Meta:
		model = RefreshTokens
		fields = ['user']


class PasswordResetRequestSerializer(serializers.ModelSerializer):
    # email = serializers.EmailField()
    # password = serializers.CharField()
    class Meta:
        model = ResetPasswordModel
        fields = '__all__'
    print('serializer call')
    def validate_email(self, value):
        try:
            print('inside first try')
            User.objects.get(email=value)
        except User.DoesNotExist:
            print('inside first except')
            raise serializers.ValidationError("No user found with this email address.")
        return value

    def save(self):
        print('inside save')
        email = self.validated_data['email']
        user = User.objects.get(email=email)
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        
        print('befor send email')
        # Send email
        send_mail(
            'Password Reset',
            f'Please use the link to reset your password: http://localhost:8000/api/password_reset_confirm/{uid}/{token}/',
            'wepong10auth@gmail.com',
            [email],
            fail_silently=False,
        )
        print('after send email')
        reset_request = ResetPasswordModel.objects.create(
            email=email,
            password=self.validated_data['password']  # Assuming you have a user field in ResetPasswordModel
            # Add other fields as necessary, if your model requires them
        )
        return reset_request

from django.contrib.auth.password_validation import validate_password

class PasswordResetConfirmSerializer(serializers.Serializer):
    new_password = serializers.CharField()
    token = serializers.CharField()
    uid = serializers.CharField()

    def validate_new_password(self, value):
        validate_password(value)
        return value

    def save(self):
        uid = self.validated_data['uid']
        token = self.validated_data['token']
        new_password = self.validated_data['new_password']

        try:
            user_id = force_str(urlsafe_base64_decode(uid))
            user = User.objects.get(pk=user_id)

            if default_token_generator.check_token(user, token):
                user.set_password(new_password)
                user.save()
            else:
                raise serializers.ValidationError("Invalid token.")
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            raise serializers.ValidationError("Invalid user.")