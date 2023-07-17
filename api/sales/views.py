from decimal import Decimal

from rest_framework import permissions
from rest_framework import status
from rest_framework.exceptions import UnsupportedMediaType, ValidationError
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Product, Transaction
from .serializers import ProductSerializer, FileUploadSerializer


class ProductList(APIView):
    """
    List all products
    """

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        try:
            products = Product.objects.all()
            serializer = ProductSerializer(products, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({'detail': f'Error {e}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class TransactionsCreate(APIView):
    """
    Creates the transactions from the received file
    """
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser]

    def post(self, request, format=None):
        try:
            serializer = FileUploadSerializer(data=request.data)
            if serializer.is_valid() is False:
                return Response({'detail': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
            transactions_list = serializer.save()
            for obj in transactions_list:
                type_operation = int(obj['type'])
                value = Decimal(f"{obj['value'][:-2]}.{obj['value'][-2:]}")
                t_saved = Transaction.objects.create(
                    type=type_operation,
                    date=obj['date'],
                    value=value,
                    vendor=obj['vendor']
                )
                product = Product.objects.filter(name=obj['product']).first()
                if not product:
                    product = Product.objects.create(name=obj['product'], total=value)
                else:
                    if type_operation is not 3:
                        product.total += value
                    else:
                        product.total -= value
                product.transactions.add(t_saved)
                product.save()

            return Response({'detail': 'Sucess'}, status=status.HTTP_200_OK)
        except UnsupportedMediaType as e:
            raise e
        except ValidationError as e:
            return Response({'detail': e.detail}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail': f'Error {e}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
