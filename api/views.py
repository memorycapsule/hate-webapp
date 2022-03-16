import re
from django.shortcuts import render
from .serializer import TextSerializer
from rest_framework import generics
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from .models import getTextFromField
from django.views.decorators.csrf import csrf_exempt
import json
# Create your views here.

class apiView(CreateAPIView):
    queryset = getTextFromField.objects.all()
    serializer_class = TextSerializer
    
    @csrf_exempt 
    def get(self, request):
        return Response('Hello')
    
    @csrf_exempt 
    def post(self, request):

        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        print(body['data'])

        return Response('World ' + body['data'])
