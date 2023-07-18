# Sales Report API

All URIs are relative to [Sales Report API](http://localhost:8080/api/v1)

| Method                                                          | HTTP request                | Description                              |
|-----------------------------------------------------------------|-----------------------------|------------------------------------------|
| [**Sales Upload**](API.md#sales-upload)                         | **POST** /sales/upload      | Uploads the sales report to be processed |
| [**Get Product Transactions**](API.md#get-product-transactions) | **GET** /sales/transactions | Get the transaction list of the products |
| **Login User**                                                  | **GET** /api-auth/login     | Logs user into the system                |
| **Logout User**                                                 | **GET** /api-auth/logout    | Logs out current logged in user session  |
| **Admin**                                                       | **GET** /admin              | Page Django admin  |

# **Sales Upload**
It uploads the sales report file, processes it, and stores it in the database.

### Example
```
POST /sales/upload
Host: /api/v1/
Content-Length: 2740
Content-Type: multipart/form-data;  boundary=abcde12345
Content-Disposition: form-data; filename="sales.txt"
Content-Type: text/plain
[file content goes there]
--abcde12345--
```
### Authorization
Authorization is required

### HTTP request headers
- **Content-Type**: multipart/form-data;

### Parameters

| Name     | Type                           | Description                        | Notes      |
|----------|--------------------------------|------------------------------------|------------|
| **body** | [**list[Sales]**](./sales.txt) | The file containing the sales list | [required] |

### Responses

| Code | Description          | Example                   |
|------|----------------------|---------------------------|
| 200  | Successful operation | [Success](API.md#success) |
| 400  | Business errors      | [Invalid](API.md#invalid) |
| 500  | Not handled error    | [Error](API.md#error)     |

#### Success
```json
{
  "detail": "Sucess"
}
```

#### Invalid
```json
{
  "detail": "Invalid input x"
}
```

#### Error
```json
{
  "detail": "Error description"
}
```

# **Get Product Transactions**
Returns the list of imported product transactions with a totalizer of the value of transactions carried out.


### Example
```
GET /sales/transactions
Content-Type: application/json;
```

### Authorization
Authorization is required

### HTTP request headers
- **Content-Type**: application/json

### Responses

| Code | Description          | Example                     |
|------|----------------------|-----------------------------|
| 200  | Successful operation | [Success](API.md#success-1) |
| 500  | Not handled error    | [Error](API.md#error-1)     |

#### Success
```json
[
  {
    "id": 123,
    "product": "CURSO DE BEM-ESTAR",
    "transactions": [
      {
        "id": 456,
        "type": "+",
        "date": "2022-01-15T19:20:30-03:00",
        "value": 127.50,
        "vendor": "JOSE CARLOS"
      }
    ],
    "total": 500.00
  }
]
```

#### Error
```json
{
  "detail": "Error"
}
```
