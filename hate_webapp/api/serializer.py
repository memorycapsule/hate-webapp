from rest_framework import serializers
from .models import getTextFromField

class TextSerializer(serializers.ModelSerializer):
    class Meta:
        model = getTextFromField
        fields = '__all__'