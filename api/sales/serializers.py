from rest_framework import serializers

from .models import Transaction, Product
from .utils import file_to_transactions


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    transactions = TransactionSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            'id',
            'name',
            'total',
            'transactions'
        ]


class FileUploadSerializer(serializers.Serializer):
    file = serializers.FileField(allow_empty_file=False)

    def validate_file(self, value):
        if 'text/plain' not in value.content_type:
            raise serializers.ValidationError('The file is not text type')
        return value

    def create(self, validated_data):
        file_obj = validated_data.get('file')
        byte_str = file_obj.file.read()
        return file_to_transactions(byte_str.decode('UTF-8'))
