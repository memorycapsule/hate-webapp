import re
from api.apps import runLR, runNB, runRF, runSVC, getTweets, runMLP, runSGD
from .serializer import TextSerializer
from rest_framework import generics
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from .models import getTextFromField
from django.views.decorators.csrf import csrf_exempt
# Create your views here.

class apiView(CreateAPIView):
    queryset = getTextFromField.objects.all()
    serializer_class = TextSerializer
    
    @csrf_exempt 
    def get(self, request):
        result = getTweets()
        print(result)
        return Response(result)
    
    @csrf_exempt 
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        result = ""
        if serializer.is_valid():
            data = serializer.data.get('data')
            model = serializer.data.get('model')
            if model == "Logistic Regression":
                result = runLR(data)
            elif model == "Linear SVC":
                result = runSVC(data)
            elif model == "Naive Bayes":
                result = runNB(data)
            elif model == "Random Forest":
                result = runRF(data)
            elif model == "MLP":
                result = runMLP(data)
            elif model == "SGDClassifier":
                result = runSGD(data)
            else:
                #run default Linear SVC
                result = runSVC(data)
        return Response(result)
    





