CREATE DATABASE AuthUser;

use AuthUser;

CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(228) NOT NULL,
    lastname VARCHAR(228) NOT NULL,
    username VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR(128) NOT NULL,
    email VARCHAR(50)
);

ALTER TABLE user (
    ADD created_at TIMESTAMP DEFAULT NOW(),
    ADD image_url VARCHAR(225)
)