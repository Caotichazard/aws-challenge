
CREATE USER 'aws-eldorado' IDENTIFIED BY 'password';
FLUSH PRIVILEGES;
GRANT USAGE ON *.* TO 'aws-eldorado'@localhost IDENTIFIED BY 'password';
GRANT ALL privileges ON `AWSChallenge`.* TO 'aws-eldorado'@localhost;
FLUSH PRIVILEGES;
CREATE DATABASE IF NOT EXISTS AWSChallenge;

use AWSChallenge;

CREATE TABLE IF NOT EXISTS categories (
    ID_Category int NOT NULL PRIMARY KEY AUTO_INCREMENT ,
    name varchar(128) NOT NULL
);

CREATE TABLE IF NOT EXISTS devices (
    ID_Device int NOT NULL PRIMARY KEY AUTO_INCREMENT ,   
    color varchar(16) NOT NULL,
    partNumber int NOT NULL,
    ID_Category int NOT NULL,
    FOREIGN KEY(ID_Category) REFERENCES categories(ID_Category)
);