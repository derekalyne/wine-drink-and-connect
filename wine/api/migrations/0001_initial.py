# Generated by Django 2.1.7 on 2019-04-19 20:12

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='WineLoc',
            fields=[
                ('wid', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('winery', models.CharField(max_length=255, null=True)),
                ('year', models.IntegerField(null=True)),
                ('variety', models.CharField(max_length=255, null=True)),
                ('price', models.FloatField(null=True)),
                ('designation', models.CharField(max_length=255, null=True)),
                ('locid', models.IntegerField(null=True)),
                ('region', models.CharField(max_length=255, null=True)),
                ('province', models.CharField(max_length=255, null=True)),
                ('country', models.CharField(max_length=255, null=True)),
            ],
            options={
                'db_table': 'wines',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Drinkers',
            fields=[
                ('username', models.CharField(max_length=255, primary_key=True, serialize=False)),
                ('password', models.CharField(max_length=255)),
                ('name', models.CharField(blank=True, max_length=255, null=True)),
                ('age', models.IntegerField(blank=True, null=True)),
                ('gender', models.CharField(blank=True, max_length=255, null=True)),
            ],
            options={
                'db_table': 'drinkers',
            },
        ),
        migrations.CreateModel(
            name='Locations',
            fields=[
                ('locid', models.AutoField(primary_key=True, serialize=False)),
                ('region', models.CharField(blank=True, max_length=255, null=True)),
                ('province', models.CharField(blank=True, max_length=255, null=True)),
                ('country', models.CharField(blank=True, max_length=255, null=True)),
            ],
            options={
                'db_table': 'locations',
            },
        ),
        migrations.CreateModel(
            name='Reviews',
            fields=[
                ('rid', models.AutoField(primary_key=True, serialize=False)),
                ('description', models.CharField(max_length=511)),
                ('rating', models.IntegerField()),
                ('wid', models.IntegerField()),
                ('username', models.CharField(max_length=255)),
            ],
            options={
                'db_table': 'reviews',
            },
        ),
        migrations.CreateModel(
            name='Wines',
            fields=[
                ('wid', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('winery', models.CharField(blank=True, max_length=255, null=True)),
                ('year', models.IntegerField(blank=True, null=True)),
                ('variety', models.CharField(blank=True, max_length=255, null=True)),
                ('price', models.FloatField(blank=True, null=True)),
                ('designation', models.CharField(blank=True, max_length=255, null=True)),
                ('locid', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'wines',
            },
        ),
    ]