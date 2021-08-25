# IMFO Backend API

## Table of Contents
- [Tech]
- [Introduction]
- [Up and Running]
    - [Local Setup]
- [REST API]
	- [Endpoints]
- [Contributing]
##
## Tech
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework.
* [Mysql] - Sequelize is a promise-based ORM for Node.js
* [Sequelize] -  In addition, we're going to use Sequelize, which is a database [ORM][9] that will interface with the **MySQL**, **PostgreSQL**, **SQLite**, and **MariaDB** databases for us.
## Introduction

Our app directory consists on the following folders

| Directory | Description |
|---|---|
| app/config/  | Contains all of your environments, database configuration and middleware configuations. |
| app/controllers/  | Contains all of our endpoints defination. |
| app/db/migrations  | Your database migrations scripts. Keep this files in Javascript and run `DATABASE_URL=mysql://root:tomei@localhost:3306/tomeidb npm run db:migrate` to migrate your database schema. |
| app/models/ | Sequelize entities. |
| app/routes/ | Our endpoints listing. |

First, define your database schema in config/database.ts file.
Use [Sequelize CLI](http://docs.sequelizejs.com/en/v6/docs/migrations/) to initialize your database.

In models/ directory, the index.ts file define the DbConnection interface. When you create a new Sequelize entity, add its reference in this interface to fully use Typescript's superpower !
## Up and Running

### Local Setup
Make sure you have [Node.js][3] and the [Mysql] installed.
Install the dependencies and devDependencies and start the server.

```sh
git clone https://github.com/faizanah/TypeScript-Express-Sequelize.git # or clone your own fork
cd TypeScript-Express-Sequelize
npm install # To install NodeJS dependencies.
```

```bash
npm install -g yarn
yarn
```

The build tasks use **Gulp tasks runner**. Typescript is transpiled to Javascript in the /build directory.
This app use [Mysql] database but you can easily change it and use your favorite relational database (npm or yarn command) :
```bash
npm install --save mysql // For both mysql and mariadb dialects
npm install --save sqlite3
npm install --save tedious // MSSQL
```
## Environment Variable setup

Export environment variables through terninals
```
* export DATABASE_URL="mysql://username:password@host:3306/database"
* export SECRET="My Secret 64bit"
* export NODE_ENV=production
* export PORT=3000
```
Or rename the `/env.example` to `.env` update the values file for your environment
```
DATABASE_URL=mysql://cffd21a9fqxvl21k:a6p79vk06nnsefb2@c9cujduvu830eexs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/ovievyi2203s2fab
NODE_ENV=development
SECRET=1234zxcv
```

The **server/config/environment.ts** file contain our application environment variables, such as database authentication configuration, secret etc. ..

Be sure to update the **server/config/environment.ts** file for your development, test, and production environment or add new environmnet variables:


```
require('dotenv').config();
module.exports = {
   development: {
     DATABASE_URL: 'Test DB Connection String',
     secret: 'Development Secret',
     port: 3000
   },
   test: {
     DATABASE_URL: 'Test DB Connection String',
     secret: 'Testing Secret',
     port: 3000
   },
   production: {
     DATABASE_URL: process.env.DATABASE_URL,
     secret: process.env.SECRET,
     port: process.env.PORT || 3000
   }
 }
```
If you are just running this locally, using the basic development server, then just update the development config.

----------


## Run the project

```bash
npm start
```
Restful API Flow
--------------------
#### Signup

Post request to `localhost:3000/api/v1/signup/`
```
{
	"name": "Danny Nguyen",
	"avatar": "",
	"email": "soldiers1987@gmail.com",
	"password": "password"
}
```

Response
```
{
    "success": true,
	 "data": {
        "id": 4,
        "name": "Danny nguyen",
        "avatar": "",
        "email": "soldiers1987@gmail.com",
        "createdAt": "2021-08-18T14:16:01.983Z",
        "updatedAt": "2021-08-18T14:16:01.983Z"
    },
	 "message": "Congrats! You have Successfully registerd."
 }
```

#### Login
Using your account credentials you need to create a session to receive a token to authenticate all other API calls.

Post request to`localhost:3000/api/v1/login/`
```
{
	"email": "faizan.ahmad@virtualforce.io",
	"password": "password"
}
```

Response
```
{
    "success": true,
    "data": {
        "id": 4,
        "name": "Danny nguyen",
        "avatar": "",
        "email": "soldiers1987@gmail.com",
        "createdAt": "2021-08-18T14:16:01.983Z",
        "updatedAt": "2021-08-18T14:16:01.983Z"
    },
    "message": "login successfully.",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZhaXphbkBlbmdpbmV0ZWNoLmlvIidsZLyeicvlVN7eWnLuMuOi5E5y-_TYY"
}
```

To  authenticate all the request you need to set the Authoization header `-H 'x-access-token: {{token}}'` using your token and send this along with your request.

## Build

```bash
npm run build
```

