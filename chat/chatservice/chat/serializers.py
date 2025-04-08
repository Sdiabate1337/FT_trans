from rest_framework import serializers
from .models import Room, Message
from django.contrib.auth import get_user_model  # Get the custom user model

User = get_user_model()  # Reference the custom user model

class MessageSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(source='user.id')
    message = serializers.CharField(source='content')
    timestamp = serializers.DateTimeField()

    class Meta:
        model = Message
        fields = ['user_id', 'message', 'timestamp']

class RoomSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many=True, read_only=True)
    users = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True)

    class Meta:
        model = Room
        fields = ['id', 'name', 'users', 'messages']

    def create(self, validated_data):
        # Extract users and name from validated data
        users = validated_data.pop('users')
        name = validated_data.get('name')

        # Check if a room with the same name and exact set of users exists
        existing_room = Room.objects.filter(name=name, users__in=users).distinct()
        if existing_room.exists():
            return existing_room.first()

        # If no such room exists, create a new one
        room = Room.objects.create(name=name)
        room.users.set(users)  # Set the users many-to-many relationship
        return room