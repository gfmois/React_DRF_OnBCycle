# Generated by Django 4.0.1 on 2023-02-03 11:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rents', '0003_alter_rent_end_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rent',
            name='start_date',
            field=models.CharField(max_length=255),
        ),
    ]
