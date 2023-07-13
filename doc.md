# Sales Report API

All URIs are relative to [Sales Report API](http://localhost:8080/api/v1)

| Method                                                          | HTTP request                | Description                              |
|-----------------------------------------------------------------|-----------------------------|------------------------------------------|
| [**Sales Upload**](doc.md#sales-upload)                         | **POST** /sales/upload      | Uploads the sales report to be processed |
| [**Get Product Transactions**](doc.md#get-product-transactions) | **GET** /sales/transactions | Get the transaction list of the products |
| [**Login User**](doc.md#login-user)                             | **POST** /login             | Logs user into the system                |
| [**Logout User**](doc.md#logout-user)                           | **GET** /logout             | Logs out current logged in user session  |

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
| 200  | Successful operation | [Success](doc.md#success) |
| 405  | Invalid input        | [Invalid](doc.md#invalid) |
| 500  | Error                | [Error](doc.md#error)     |

#### Success
```json
{
  "code": 200,
  "message": "Sucess"
}
```

#### Invalid
```json
{
  "code": 402,
  "message": "Invalid input"
}
```

#### Error
```json
{
  "code": 500,
  "message": "Error"
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
| 200  | Successful operation | [Success](doc.md#success-1) |
| 500  | Error                | [Error](doc.md#error-1)     |

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
  "code": 500,
  "message": "Error"
}
```