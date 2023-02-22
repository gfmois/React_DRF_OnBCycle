# Generated by Django 4.0.1 on 2023-02-22 12:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('stations', '0006_alter_station_id_station'),
        ('notifications', '0002_alter_notification_read_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='notification',
            name='station',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='station', to='stations.station'),
        ),
    ]
