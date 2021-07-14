
CREATE USER 'aws-eldorado' IDENTIFIED BY 'password';
FLUSH PRIVILEGES;
GRANT USAGE ON *.* TO 'aws-eldorado'@localhost IDENTIFIED BY 'password';
GRANT ALL privileges ON `AWSChallenge`.* TO 'aws-eldorado'@localhost;
FLUSH PRIVILEGES;
CREATE DATABASE IF NOT EXISTS AWSChallenge;

use AWSChallenge;

CREATE TABLE IF NOT EXISTS category (
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT ,
    name varchar(128) NOT NULL
)