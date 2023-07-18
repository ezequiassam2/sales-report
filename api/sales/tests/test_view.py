from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase

from sales.models import Transaction, Product


class ProductListViewTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        number_of_productions = 5
        date = '2022-01-15T22:20:30Z'
        for production_index in range(number_of_productions):
            product = Product.objects.create(name=f'PRODUTO {production_index}', total=production_index)
            transaction = Transaction.objects.create(type=1, date=date, value=production_index,
                                                     vendor=f'VENDEDOR {production_index}')
            product.transactions.add(transaction)
            product.save()

    def test_view_url_exists_at_desired_location(self):
        response = self.client.get('/api/v1/products')
        self.assertEqual(response.status_code, 200)

    def test_lists_all_products(self):
        response = self.client.get('/api/v1/products')
        self.assertEqual(response.status_code, 200)
        self.assertTrue(len(response.data) == 5)

    def test_check_json_products(self):
        response = self.client.get('/api/v1/products')
        data = response.json()
        self.assertTrue(type(data) == list)
        index = 0
        for p in data:
            self.assertEqual(p['name'], f'PRODUTO {index}')
            self.assertEqual(p['total'], f'{index}.00')
            self.assertTrue(len(p['transactions']) == 1)
            self.assertTrue(p['transactions'][0]['value'] == f'{index}.00')
            self.assertEqual(p['transactions'][0]['vendor'], f'VENDEDOR {index}')
            index += 1


def create_data_file(content=b'12022-01-15T19:20:30-03:00CURSO DE BEM-ESTAR            0000012750JOSE CARLOS'):
    data = SimpleUploadedFile(
        'sample.txt',
        content,
        content_type='text/plain')
    return {'file': data}


class TransactionsCreateTest(TestCase):

    def test_view_post_success(self):
        data = create_data_file()
        response = self.client.post('/api/v1/upload', data=data, format='multipart')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'detail': 'Sucess'})

    def test_view_error_empty_file(self):
        data = create_data_file(b'')
        response = self.client.post('/api/v1/upload', data=data, format='multipart')
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {'detail': {'file': ['The submitted file is empty.']}})

    def test_view_error_empty_content(self):
        data = create_data_file(b'     ')
        response = self.client.post('/api/v1/upload', data=data, format='multipart')
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {'detail': {'file': ['The submitted file is empty.']}})

    def test_error_len_line(self):
        s = ''
        for i in range(49):
            s += f'{i}'
        data = create_data_file(f'{s}'.encode("utf-8"))
        response = self.client.post('/api/v1/upload', data=data, format='multipart')
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {'detail': [f"Unable to convert line [{s}]"]})

    def test_error_parser_type(self):
        data = create_data_file(b'a')
        response = self.client.post('/api/v1/upload', data=data, format='multipart')
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {'detail': ['The value [a] does not match the specified']})

    def test_error_parser_date(self):
        data = create_data_file(b'1date')
        response = self.client.post('/api/v1/upload', data=data, format='multipart')
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {'detail': ['The value [date] does not match the specified']})

    def test_error_parser_product(self):
        data = create_data_file(b'12022-01-15T19:20:30-03:0055#JO')
        response = self.client.post('/api/v1/upload', data=data, format='multipart')
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {'detail': ['The value [55#JO] does not match the specified']})

    def test_error_parser_value(self):
        data = create_data_file(b'12022-01-15T19:20:30-03:00CURSO DE BEM-ESTAR            value')
        response = self.client.post('/api/v1/upload', data=data, format='multipart')
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {'detail': ['The value [value] does not match the specified']})

    def test_error_parser_vendor(self):
        data = create_data_file(b'12022-01-15T19:20:30-03:00CURSO DE BEM-ESTAR            000001275055#JO')
        response = self.client.post('/api/v1/upload', data=data, format='multipart')
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {'detail': ['The value [55#JO] does not match the specified']})
