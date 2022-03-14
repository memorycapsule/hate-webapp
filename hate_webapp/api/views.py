from django.shortcuts import render
from .serializer import TextSerializer
from rest_framework import generics
from rest_framework.generics import CreateAPIView
from .models import getTextFromField
# Create your views here.

class apiView(CreateAPIView):
    queryset = getTextFromField.objects.all()
    serializer_class = TextSerializer