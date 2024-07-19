USE freewater_favorite;

CREATE TABLE IF NOT EXISTS favorite_city
(
    id         INT AUTO_INCREMENT PRIMARY KEY,
    username   VARCHAR(255) NOT NULL,
    cityCode   VARCHAR(255) NOT NULL
);

