CREATE
DATABASE IF NOT EXISTS user_db;

USE
user_db;

CREATE TABLE IF NOT EXISTS users
(
    id
    INT
    AUTO_INCREMENT
    PRIMARY
    KEY,
    username
    VARCHAR
(
    255
) NOT NULL UNIQUE,
    password VARCHAR
(
    255
) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
