CREATE DATABASE perntodo;

CREATE TABLE todo(
todo_id SERIAL PRIMARY KEY,
description VARCHAR(255),
user_email VARCHAR(255),
);

CREATE TABLE users(
users_id SERIAL PRIMARY KEY,
 user_name VARCHAR(255),
 user_password VARCHAR(255),
 user_email VARCHAR(255)
);