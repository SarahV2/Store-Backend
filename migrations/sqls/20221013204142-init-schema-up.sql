CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    price FLOAT NOT NULL
);


CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(150) NOT NULL,
    last_name VARCHAR(150) NOT NULL,
    username VARCHAR(150) NOT NULL,
    password VARCHAR(150) NOT NULL
);

CREATE TABLE orders (
    orderID SERIAL PRIMARY KEY,
    user_id int NOT NULL,
    product_id int NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    product_count integer NOT NULL,
    order_status VARCHAR(50) NOT NULL
);
