# API Documentation

## User Routes

### Register User

- Method: POST
- Path: `/user/register`
- Description: Registers a new user.
- Request Body:
  - `email` (required): User's email address.
  - `password` (required): User's password.
  - `name` (required): User's name.
  - `role` (required): User's role (admin, manager, or user).
- Success Response:
  - Status: 201 Created
  - Response Body: `{ message: "User created successfully" }`
- Error Response:
  - Status: 400 Bad Request
  - Response Body: `{ error: "Invalid email address" }`

### Login User

- Method: POST
- Path: `/user/login`
- Description: Logs in a user.
- Request Body:
  - `email` (required): User's email address.
  - `password` (required): User's password.
- Success Response:
  - Status: 200 OK
  - Response Body: `{ message: "User logged in successfully" }`
- Error Response:
  - Status: 401 Unauthorized
  - Response Body: `{ error: "Invalid credentials" }`

### Get User Profile

- Method: GET
- Path: `/user/profile`
- Description: Retrieves user profile.
- Authorization: Bearer Token
- Success Response:
  - Status: 200 OK
  - Response Body: `{ id: 1, email: "user@example.com", name: "John Doe", role: "user" }`
- Error Response:
  - Status: 401 Unauthorized
  - Response Body: `{ error: "Unauthorized access" }`

### Update User Profile

- Method: PUT
- Path: `/user/profile`
- Description: Updates user profile.
- Authorization: Bearer Token
- Request Body:
  - `email`: User's email address.
  - `name`: User's name.
- Success Response:
  - Status: 200 OK
  - Response Body: `{ message: "User profile updated successfully" }`
- Error Response:
  - Status: 401 Unauthorized
  - Response Body: `{ error: "Unauthorized access" }`

### Get All Users

- Method: GET
- Path: `/user`
- Description: Retrieves all users.
- Authorization: Bearer Token (Required for admin access)
- Success Response:
  - Status: 200 OK
  - Response Body: Array of user objects
- Error Response:
  - Status: 401 Unauthorized
  - Response Body: `{ error: "Unauthorized access" }`

## Product Routes

### Create Product

- Method: POST
- Path: `/product`
- Description: Creates a new product.
- Request Body:
  - `name` (required): Product name.
  - `description` (required): Product description.
- Success Response:
  - Status: 201 Created
  - Response Body: `{ message: "Product created successfully" }`
- Error Response:
  - Status: 400 Bad Request
  - Response Body: `{ error: "Invalid product name" }`

### Get All Products

- Method: GET
- Path: `/product`
- Description: Retrieves all products.
- Success Response:
  - Status: 200 OK
  - Response Body: Array of product objects

### Get Product by ID

- Method: GET
- Path: `/product/{id}`
- Description: Retrieves a specific product by ID.
- Path Parameter:
  - `id` (required): Product ID.
- Success Response:
  - Status: 200 OK
  - Response Body: Product object
- Error Response:
  - Status: 404 Not Found
  - Response Body: `{ error: "Product not found" }`

### Update Product

- Method: PUT
- Path: `/product/{id}`
- Description: Updates a specific product by ID.
- Path Parameter:
  - `id` (required): Product ID.
- Request Body:
  - `name`: Product name.
  - `description`: Product description.
- Success Response:
  - Status: 200 OK
  - Response Body: `{ message: "Product updated successfully" }`
- Error Response:
  - Status: 404 Not Found
  - Response Body: `{ error: "Product not found" }`

### Delete Product

- Method: DELETE
- Path: `/product/{id}`
- Description: Deletes a specific product by ID.
- Authorization: Bearer Token (Required for manager access)
- Path Parameter:
  - `id` (required): Product ID.
- Success Response:
  - Status: 200 OK
  - Response Body: `{ message: "Product deleted successfully" }`
- Error Response:
  - Status: 404 Not Found
  - Response Body: `{ error: "Product not found" }`

## Order Routes

### Create Order

- Method: POST
- Path: `/order`
- Description: Creates a new order.
- Request Body:
  - `productId` (required): ID of the product to order.
  - `quantity` (required): Quantity of the product to order.
- Success Response:
  - Status: 201 Created
  - Response Body: `{ message: "Order created successfully" }`
- Error Response:
  - Status: 400 Bad Request
  - Response Body: `{ error: "Invalid product ID" }`

### Get All Orders

- Method: GET
- Path: `/order`
- Description: Retrieves all orders.
- Success Response:
  - Status: 200 OK
  - Response Body: Array of order objects

### Get Order by ID

- Method: GET
- Path: `/order/{id}`
- Description: Retrieves a specific order by ID.
- Path Parameter:
  - `id` (required): Order ID.
- Success Response:
  - Status: 200 OK
  - Response Body: Order object
- Error Response:
  - Status: 404 Not Found
  - Response Body: `{ error: "Order not found" }`

### Update Order

- Method: PUT
- Path: `/order/{id}`
- Description: Updates a specific order by ID.
- Path Parameter:
  - `id` (required): Order ID.
- Request Body:
  - `quantity`: Updated quantity of the ordered product.
- Success Response:
  - Status: 200 OK
  - Response Body: `{ message: "Order updated successfully" }`
- Error Response:
  - Status: 404 Not Found
  - Response Body: `{ error: "Order not found" }`

### Delete Order

- Method: DELETE
- Path: `/order/{id}`
- Description: Deletes a specific order by ID.
- Authorization: Bearer Token
- Path Parameter:
  - `id` (required): Order ID.
- Success Response:
  - Status: 200 OK
  - Response Body: `{ message: "Order deleted successfully" }`
- Error Response:
  - Status: 404 Not Found
  - Response Body: `{ error: "Order not found" }`
