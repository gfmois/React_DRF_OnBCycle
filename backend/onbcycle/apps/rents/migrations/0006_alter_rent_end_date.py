# Generated by Django 4.0.1 on 2023-02-14 16:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rents', '0005_rent_id_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rent',
            name='end_date',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
