from rest_framework import generics
from .models import Room, Message
from .serializers import RoomSerializer, MessageSerializer
from django.shortcuts import get_object_or_404

class RoomListView(generics.ListCreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

    def perform_create(self, serializer):
        serializer.save()


class MessageListCreateView(generics.ListCreateAPIView):
    serializer_class = MessageSerializer

    def get_queryset(self):
        room_name = self.kwargs['room_name']
        return Message.objects.filter(room__name=room_name)

    def perform_create(self, serializer):
        room_name = self.kwargs['room_name']
        room = get_object_or_404(Room, name=room_name)
        serializer.save(user=self.request.user, room=room)
