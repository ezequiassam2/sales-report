import uuid

from django.db import models


class Transaction(models.Model):
    VENDA_PRODUTOR = 1
    VENDA_AFILIADO = 2
    COMISSAO_PAGA = 3
    COMISSAO_RECEBIDA = 4
    TYPE_CHOISES = [
        (VENDA_PRODUTOR, 'Venda Produtor'),
        (VENDA_AFILIADO, 'Venda Afiliado'),
        (COMISSAO_PAGA, 'Comissão Paga'),
        (COMISSAO_RECEBIDA, 'Comissão Recebida'),
    ]
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        null=False,
        blank=True)

    type = models.CharField(
        max_length=1,
        choices=TYPE_CHOISES,
        null=False,
        blank=False)

    date = models.DateTimeField(
        null=False,
        blank=False)

    value = models.DecimalField(
        null=False,
        blank=False,
        max_digits=10,
        decimal_places=2)

    vendor = models.CharField(
        max_length=20,
        null=False,
        blank=False)

    class Meta:
        ordering = ['date']


class Product(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        null=False,
        blank=True)

    name = models.CharField(
        unique=True,
        max_length=30,
        null=False,
        blank=False)

    total = models.DecimalField(
        null=False,
        blank=False,
        max_digits=10,
        decimal_places=2)

    transactions = models.ManyToManyField(
        Transaction,
        verbose_name='list of transactions'
    )
