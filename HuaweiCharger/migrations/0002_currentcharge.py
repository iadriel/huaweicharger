# Generated by Django 2.1.3 on 2018-11-10 22:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('HuaweiCharger', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='CurrentCharge',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('percentage', models.IntegerField(choices=[(0, '0%'), (5, '5%'), (10, '10%'), (15, '15%'), (20, '20%'), (25, '25%'), (30, '30%'), (35, '35%'), (40, '40%'), (45, '45%'), (50, '50%'), (55, '55%'), (60, '60%'), (65, '65%'), (70, '70%'), (75, '75%'), (80, '80%'), (85, '85%'), (90, '90%'), (95, '95%'), (100, '100%')], default=0)),
            ],
        ),
    ]
