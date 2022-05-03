from django.db import models

# Create your models here.

class getTextFromField(models.Model):
    data = models.CharField(max_length = 256, default="")
    model = models.CharField(max_length = 256, default="")