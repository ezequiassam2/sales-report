# Generated by Django 4.2.3 on 2023-07-16 20:21

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.UUIDField(blank=True, default=uuid.uuid4, primary_key=True, serialize=False)),
                ('type', models.CharField(choices=[(1, 'Venda Produtor'), (2, 'Venda Afiliado'), (3, 'Comissão Paga'), (4, 'Comissão Recebida')], max_length=1)),
                ('date', models.DateTimeField()),
                ('value', models.DecimalField(decimal_places=2, max_digits=10)),
                ('vendor', models.CharField(max_length=20)),
            ],
            options={
                'ordering': ['date'],
            },
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.UUIDField(blank=True, default=uuid.uuid4, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=30, unique=True)),
                ('total', models.DecimalField(decimal_places=2, max_digits=10)),
                ('transactions', models.ManyToManyField(to='sales.transaction', verbose_name='list of transactions')),
            ],
        ),
    ]
