from rest_framework import serializers
from .models import PostComment

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostComment
        fields = ('code','word','likes', 'created')

class updateComment(serializers.ModelSerializer):
    class Meta:
        model = PostComment
        fields = ('word', 'likes')