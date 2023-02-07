# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products

| Route     | Description | Authentication Required?
| ---      | ---       |  :---: 
| **GET** /products| Index: Lists all products| No |
| **GET** /products/:product_id | Show: Retrieves information of a single product by ID| No |
| **POST** /products | Create: Creates a new product| Yes |

#### Users

| Route     | Description | Authentication Required?
| ---      | ---       |  :---: 
| **GET** /users| Index: Lists all users| Yes |
| **GET** /users/:user_id | Show: Retrieves information of a single user by ID| Yes |
| **POST** /users | Create: Creates a new user| Yes |
| **POST** /users/login | Authenticate: Enable an existing user login| Yes |

#### Orders

| Route     | Description | Authentication Required?
| ---      | ---       |  :---: 
| **POST** /orders| Create: Creates a new order| Yes |
| **POST** /orders/:order_id | Adds products to an existing order| Yes |
| **GET** /orders | Get current user's orders (can be filtered by order status)| Yes |

## Data Shapes
#### Product
| **Property**     | **Type** |
| :---:       | :---: | 
|product_id| number|
| name | VARCHAR |
| price|VARCHAR| 


#### User
| **Property**     | **Type** |
| :---:       | :---: | 
|user_id| number|
| username | VARCHAR |
| password|VARCHAR| 
| first_name|VARCHAR| 
| last_name|VARCHAR| 

#### Orders
| **Property**     | **Type** |
| :---:       | :---: | 
|order_id| number|
| user_id | number [foreign key to the users table]|
| status|VARCHAR| 

#### Order Products
| **Property**     | **Type** |
| :---:       | :---: | 
|order_product_id| number|
| order_id | number (foreign key to the orders table)|
| prooduct_id|number (foreign key to the products table)|
|quantity| number|

