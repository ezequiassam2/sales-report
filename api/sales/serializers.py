from rest_framework import serializers

from api.sales.models import Transaction, Product


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['__all__']


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['__all__']
