# Generated by Django 4.0.1 on 2023-02-14 17:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('stations', '0006_alter_station_id_station'),
        ('rents', '0007_rent_station_from_rent_station_to'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rent',
            name='station_from',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='station_from', to='stations.station'),
        ),
        migrations.AlterField(
            model_name='rent',
            name='station_to',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='station_to', to='stations.station'),
        ),
    ]