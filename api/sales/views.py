from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions

from .models import Product
from .serializers import ProductSerializer


class ProductList(APIView):
    """
    List all products
    """

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        products = Product.objects.all()
        if products is None:
            return Response('error', status=status.HTTP_400_BAD_REQUEST)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)


class TransactionsCreate(APIView):
    """
    Creates the transactions from the received file
    """

    def post(self, request, format=None):
        pass
