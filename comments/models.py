from django.db import models
import random
import string
# Create your models here.

def generateUniqueID():
    while True:
        code= "".join(random.choices(string.ascii_uppercase, k=8))
        if PostComment.objects.filter(code = code).count() == 0:
            break
    return code


class PostComment(models.Model):
    user = models.CharField(max_length=50, default="") #Session ID
    code = models.CharField(max_length = 8, default=generateUniqueID, unique=True)
    word = models.CharField(max_length = 256, default="")
    likes = models.IntegerField(null=False, default=0)
    created = models.DateTimeField(auto_now_add=True) 
    
    def __str__(self):
        return self.user