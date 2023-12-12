CREATE DATABASE AuthUser;

use AuthUser;

CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR(128) NOT NULL,
    email VARCHAR(50),
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- updatedAt TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
);