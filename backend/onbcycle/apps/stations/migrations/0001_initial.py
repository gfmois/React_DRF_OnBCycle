# Generated by Django 4.0.1 on 2023-01-24 11:48

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Station',
            fields=[
                ('id_station', models.CharField(max_length=15, primary_key=True, serialize=False, unique=True)),
                ('name', models.CharField(max_length=60)),
                ('lat', models.CharField(max_length=255)),
                ('long', models.CharField(max_length=255)),
                ('capacity', models.IntegerField()),
                ('state', models.BooleanField(default=True)),
            ],
        ),
    ]
