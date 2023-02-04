CREATE TABLE products (
    productID SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    price FLOAT NOT NULL
);


CREATE TABLE users (
    userID SERIAL PRIMARY KEY,
    firstName VARCHAR(150) NOT NULL,
    lastName VARCHAR(150) NOT NULL,
    password VARCHAR(150) NOT NULL
);

CREATE TABLE orders (
    orderID SERIAL PRIMARY KEY,
    userID int NOT NULL,
    productID int NOT NULL,
    FOREIGN KEY (productID) REFERENCES products(productID),
    FOREIGN KEY (userID) REFERENCES users(userID),
    productCount integer NOT NULL,
    orderStatus VARCHAR(50) NOT NULL
);
