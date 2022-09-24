CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name text NOT NULL,
    last_name text NOT NULL,
    username text NOT NULL,
    password text NOT NULL
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    product_name text NOT NULL,
    product_description text NOT NULL,
    product_quantity text NOT NULL,
    user_id Integer NOT NULL
);