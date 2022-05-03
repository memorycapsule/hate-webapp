from venv import create
from django.shortcuts import render
from requests import request
from rest_framework import generics, status
from comments import serializer
from comments.serializer import CommentSerializer, updateComment
from django.views.decorators.csrf import csrf_exempt
from comments.models import PostComment
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
# Create your views here.

class View(generics.CreateAPIView):
    queryset = PostComment.objects.all()
    serializer_class = CommentSerializer

class createCommentView(APIView):
    serializer_class = updateComment
    def get(self, request):
        data = PostComment.objects.all()
        serializer = self.serializer_class(data, many=True)
        return Response(serializer.data)


    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            word = serializer.data.get('word')
            likes = serializer.data.get('likes')
            update, create = PostComment.objects.update_or_create(word=word, defaults={"likes" : likes})
            if update:
                return Response(status=status.HTTP_202_ACCEPTED)
            else:
                return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

