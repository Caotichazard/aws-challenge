# aws-challenge
AWS Challenge for Instituto de Pesquisas Eldorado

[The challenge](https://github.com/Caotichazard/aws-challenge/blob/main/AWS%20Challenge.pdf)

Make a simple device management web app where you can create a category and add devices with a category.

technologies used:
- Angular and AngularCLI version 12.1.1
- Node ver 16.4.2
- MySQL 15.1 with MariaDB 10.5.11

API automated tests made with:
- Node ver 16.4.2
- Chai ver ^4.3.4
- Mocha ver ^9.0.2
- SuperTest ver ^6.1.3


## Setup

First, clone the repo, then inside the backend folder execute first

    npm install

then, setup the DB by initializing the db

    sudo systemctl start mysqld

then access mysql as root with

    sudo mysql -u root -p

and use the init.sql script to create the database, tables and user needed

    source src/api/init.sql



then, change to frontend folder and go into web-app folder and execute

    npm install --legacy-peer-deps

with this, you enviroment will be configured and ready to use.

Additionaly, there are some simple automated API tests insede the api-tests directory, move there use

    npm install

to configure it


## Running

First, initialize mysql with 

    sudo systemctl start mysqld

then, navigate to the backend directory and open the backend server with 

    node src/api/server.js

after that, go back to frontend directory and run

    ng serve --open

also, there are simple automated API tests on the api-tests directory, with the API running, execute the tests with 

    npx mocha src/api.test.js 