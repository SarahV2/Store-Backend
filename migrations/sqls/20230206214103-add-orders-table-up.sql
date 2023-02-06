CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    user_id integer REFERENCES users(user_id) NOT NULL,
    status VARCHAR(50) NOT NULL
);

CREATE TABLE order_products (
    order_product_id SERIAL PRIMARY KEY,
    quantity integer NOT NULL,
    order_id integer REFERENCES orders(order_id) NOT NULL,
    product_id integer REFERENCES products(product_id) NOT NULL
);