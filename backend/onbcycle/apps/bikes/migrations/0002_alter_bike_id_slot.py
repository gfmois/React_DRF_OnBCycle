# Generated by Django 4.0.1 on 2023-02-02 20:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('slots', '0001_initial'),
        ('bikes', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bike',
            name='id_slot',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.DO_NOTHING, to='slots.slot'),
        ),
    ]
