import datetime

from django.test import TestCase

from sales.models import Transaction, Product


class TransactionModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        Transaction.objects.create(type=1, date=datetime.datetime.now(), value=1, vendor='JOSE')

    def test_type_label(self):
        transaction = Transaction.objects.first()
        field_label = transaction._meta.get_field('type').verbose_name
        self.assertEquals(field_label, 'type')

    def test_date_label(self):
        transaction = Transaction.objects.first()
        field_label = transaction._meta.get_field('date').verbose_name
        self.assertEquals(field_label, 'date')

    def test_value_label(self):
        transaction = Transaction.objects.first()
        field_label = transaction._meta.get_field('value').verbose_name
        self.assertEquals(field_label, 'value')

    def test_vendor_label(self):
        transaction = Transaction.objects.first()
        field_label = transaction._meta.get_field('vendor').verbose_name
        self.assertEquals(field_label, 'vendor')

    def test_type_max_length(self):
        transaction = Transaction.objects.first()
        max_length = transaction._meta.get_field('type').max_length
        self.assertEquals(max_length, 1)

    def test_value_max_length(self):
        transaction = Transaction.objects.first()
        max_digits = transaction._meta.get_field('value').max_digits
        self.assertEquals(max_digits, 10)

    def test_vendor_max_length(self):
        transaction = Transaction.objects.first()
        max_length = transaction._meta.get_field('vendor').max_length
        self.assertEquals(max_length, 20)


class ProductModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        product = Product.objects.create(name='CURSO EM VIDEO', total=0)
        transaction = Transaction.objects.create(type=1, date=datetime.datetime.now(), value=1, vendor='JOSE')
        product.transactions.add(transaction)
        product.save()

    def test_name_label(self):
        product = Product.objects.first()
        field_label = product._meta.get_field('name').verbose_name
        self.assertEquals(field_label, 'name')

    def test_total_label(self):
        product = Product.objects.first()
        field_label = product._meta.get_field('total').verbose_name
        self.assertEquals(field_label, 'total')

    def test_transactions_label(self):
        product = Product.objects.first()
        field_label = product._meta.get_field('transactions').verbose_name
        self.assertEquals(field_label, 'list of transactions')

    def test_name_max_length(self):
        product = Product.objects.first()
        max_length = product._meta.get_field('name').max_length
        self.assertEquals(max_length, 30)

    def test_total_max_digits(self):
        product = Product.objects.first()
        max_digits = product._meta.get_field('total').max_digits
        self.assertEquals(max_digits, 10)
