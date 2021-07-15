# aws-challenge
AWS Challenge for Instituto de Pesquisas Eldorado


## Setup

First, clone the repo, then inside the backend folder execute first
    npm install

then, setup the DB by initializing the db
    sudo systemctl start mysqld

then with
    sudo mysql -u root

use 
    source src/api/init.sql

this will create the user and add the db and tables

then, change to frontend folder and go into web-app folder and execute
    npm install --legacy-peer-deps



## Running

First, inside the backend folder initialize mysql with 
    sudo systemctl start mysqld

then open the backend server with 
    node src/api/server.js

after that, go back to frontend folder and run
    ng serve --open