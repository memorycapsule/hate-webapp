# Generated by Django 4.0.3 on 2022-04-30 14:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('comments', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='postcomment',
            old_name='text',
            new_name='comment',
        ),
        migrations.AddField(
            model_name='postcomment',
            name='word',
            field=models.CharField(default='', max_length=256),
        ),
    ]
