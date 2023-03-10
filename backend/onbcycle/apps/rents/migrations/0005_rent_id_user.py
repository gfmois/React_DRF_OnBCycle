# Generated by Django 4.0.1 on 2023-02-13 15:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_user_avatar'),
        ('rents', '0004_alter_rent_start_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='rent',
            name='id_user',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.DO_NOTHING, to='users.user'),
            preserve_default=False,
        ),
    ]
