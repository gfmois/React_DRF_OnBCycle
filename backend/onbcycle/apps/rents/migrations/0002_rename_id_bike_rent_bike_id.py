# Generated by Django 4.0.1 on 2023-02-02 20:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('rents', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='rent',
            old_name='id_bike',
            new_name='bike_id',
        ),
    ]
