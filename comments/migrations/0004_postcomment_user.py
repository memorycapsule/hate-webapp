# Generated by Django 3.2.13 on 2022-05-03 10:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('comments', '0003_remove_postcomment_comment'),
    ]

    operations = [
        migrations.AddField(
            model_name='postcomment',
            name='user',
            field=models.CharField(default='', max_length=50, unique=True),
        ),
    ]
