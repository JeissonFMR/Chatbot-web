# Generated by Django 4.1.4 on 2022-12-22 21:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sitioweb', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='opciones',
            name='nameproyecto',
            field=models.CharField(max_length=50, null=True, verbose_name='Palabra clave para que servirá el bot'),
        ),
    ]