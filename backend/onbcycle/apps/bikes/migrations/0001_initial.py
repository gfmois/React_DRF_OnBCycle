# Generated by Django 4.0.1 on 2023-02-02 10:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('slots', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Bike',
            fields=[
                ('id_bike', models.CharField(blank=True, max_length=15, primary_key=True, serialize=False, unique=True)),
                ('status', models.BooleanField(default=True)),
                ('id_slot', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='slots.slot')),
            ],
        ),
    ]
