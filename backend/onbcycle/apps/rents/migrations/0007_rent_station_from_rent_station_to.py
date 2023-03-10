# Generated by Django 4.0.1 on 2023-02-14 17:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('stations', '0006_alter_station_id_station'),
        ('rents', '0006_alter_rent_end_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='rent',
            name='station_from',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.DO_NOTHING, related_name='station_from', to='stations.station'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='rent',
            name='station_to',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.DO_NOTHING, related_name='station_to', to='stations.station'),
            preserve_default=False,
        ),
    ]
