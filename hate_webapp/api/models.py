from django.db import models

# Create your models here.

def generateText():
    return "Hate"

class getTextFromField(models.Model):
    createdAt = models.DateTimeField(auto_now_add=True)
    textFileld = models.CharField(max_length = 256, default="")
    classPredicted = models.BooleanField(null = False, default =False)