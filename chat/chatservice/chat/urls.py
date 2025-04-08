from django.urls import path
from . import views

urlpatterns = [
    path('rooms/', views.RoomListView.as_view(), name='room-list'),
    path('rooms/<str:room_name>/messages/', views.MessageListCreateView.as_view(), name='room-messages'),
]
