# Generated by Django 4.0.3 on 2022-03-14 14:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='gettextfromfield',
            old_name='created_at',
            new_name='createdAt',
        ),
        migrations.RenameField(
            model_name='gettextfromfield',
            old_name='textField',
            new_name='textFileld',
        ),
    ]
