"""
ASGI config for backend project.

It exposes the ASGI callable as a module-level variable named ``application``.

=>Asynchronous Server Gateway Interface

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from channels.db import database_sync_to_async
from django.contrib.auth.models import User, AnonymousUser
from channels.security.websocket import AllowedHostsOriginValidator
from chat.routing import websocket_urlpatterns
from django.core.asgi import get_asgi_application

# @database_sync_to_async
# def get_user(ticket):
#     try:
# 		user = User.objects.get(ticket=ticket)
# 		return user
# 	except User.DoesNotExist:
# 		return AnonymousUser()

# class QueryAuthMiddleware:
# 	def __init__(self, app):
#         self.app = app

#     async def __call__(self, scope, receive, send):

#         scope['user'] = await get_user(scope["query_string"])

#         return await self.app(scope, receive, send)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AllowedHostsOriginValidator(
		AuthMiddlewareStack(
			URLRouter(
				websocket_urlpatterns
			)
		),
    )
})
