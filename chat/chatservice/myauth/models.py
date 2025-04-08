from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone


class User (AbstractUser):
	id = models.AutoField(primary_key=True)
	email = models.EmailField(unique=True)
	is_email_confirmed = models.BooleanField(default=False)
	wallet = models.IntegerField(default=400)
	username = models.CharField(max_length=255, unique=True)
	password = models.CharField(max_length=255, null=True)
	avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
	external_avatar = models.URLField(max_length=500, blank=True, null=True)
	isTwoFA = models.BooleanField(default=False)
	isAuth = models.BooleanField(default=False)
	authProvider = models.CharField(max_length=255,null=True)
	TwoFACode = models.CharField(max_length=6, null=True, blank=True)
	TwoFA_sent_at = models.DateTimeField(null=True,blank=True)
	userStatus = models.CharField(max_length=255, null=True)
	Blocked = models.JSONField(default=list,blank=True,null=True)
	friends = models.JSONField(default=list,blank=True,null=True)
	friendRequests = models.JSONField(default=list,blank=True,null=True)
	MyRequests = models.JSONField(default=list, blank=True, null=True)
	wins = models.IntegerField(default=0)
	loses = models.IntegerField(default=0)
	createdAt = models.DateTimeField(default=timezone.now)
	updatedAt = models.DateTimeField(auto_now=True)