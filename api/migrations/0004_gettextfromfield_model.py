# Generated by Django 3.2.13 on 2022-05-03 10:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_rename_textfileld_gettextfromfield_data_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='gettextfromfield',
            name='model',
            field=models.CharField(default='', max_length=256),
        ),
    ]
