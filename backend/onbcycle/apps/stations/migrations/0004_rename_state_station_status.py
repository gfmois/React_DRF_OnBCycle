# Generated by Django 4.0.1 on 2023-01-26 10:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('stations', '0003_alter_station_city_alter_station_image'),
    ]

    operations = [
        migrations.RenameField(
            model_name='station',
            old_name='state',
            new_name='status',
        ),
    ]
