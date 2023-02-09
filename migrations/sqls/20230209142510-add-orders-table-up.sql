CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    user_id integer REFERENCES users(user_id) NOT NULL,
    status VARCHAR(50) NOT NULL
);