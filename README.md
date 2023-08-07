# Backend App with Node.js, Express, Sequelize, and JWT
This repository contains a backend application built with Node.js and Express. The app uses Sequelize as the ORM (Object-Relational Mapping) library to interact with a MySQL database. It also implements JWT (JSON Web Tokens) for authorization and authentication.
## Installation
1. Clone the repository to your local machine:
```bash
git clone https://github.com/yourusername/backend-app.git
```
1.Navigate to the project folder:
```bash
cd backend-app
```
2.Install the dependencies:
```bash
npm install
```
## Database Setup
Make sure you have MySQL installed and running on your machine. Create a new database and update the database configuration in config/db.js with your database credentials:
```bash
// config/db.js

import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "your_database_name",
  "your_username",
  "your_password",
  {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
  }
);
export default sequelize;
```
### Explanation:

   ➡️ The config/db.js file contains the database configuration using Sequelize.
   
   ➡️ Replace "your_database_name", "your_username", and "your_password" with your actual MySQL database credentials.
   
   ➡️ The host is set to "localhost" as the database is running on the same machine.
   
   ➡️ The port is set to 3306, which is the default port for MySQL.
   

## JWT Secret Key Setup
For JWT to work, you need to set a secret key for token encryption and decryption. Update the config/auth.js file with your secret key:
```bash
// config/auth.js

export const SecretKey = "your_secret_key_here";
```

## Run the Application
To start the application, run the following command:
```bash
npm start
```
Explanation:
    ➡️ The npm start command starts the Node.js server, and the backend app will be running at http://localhost:8080.

## Docker Compose
If you prefer to run the application in a Docker container, make sure you have Docker and Docker Compose installed on your machine.
Explanation:

  ➡️The docker-compose.yml file defines two services: backend for the Node.js app and mysql for the MySQL database.
  
  ➡️Replace the placeholders (your_mysql_host, your_mysql_port, etc.) with your actual MySQL database and JWT secret key.
  
  ➡️The app-network creates a custom bridge network to allow communication between the backend app and the MySQL container.
  
To start the application using Docker, run the following command:
```bash
docker-compose up --build
```
## API Reference

### Register a User 

```http
  POST /api/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required** |
| `email` | `string` | **Required** |
| `password` | `string` | **Required** |
| `full_name` | `string` | **Required** |
| `age` | `int` | **Required** |
| `gender` | `string` | **Required** |

### Generate Token
```http
  POST /api/token
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required** |
| `password` | `string` | **Required** |

### Store Data
- **`Authorization`**: Bearer **`access_token`** ⚠️

```http
  POST /api/data
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `key` | `string` | **Required** (unique_key) |
| `value` | `string` | **Required** (data_value) |

### Retrieve Data
- **`Authorization`**: Bearer **`access_token`** ⚠️
```http
GET /api/data/{key}
```
Example: https:localhost:8080/api/data/4



### Update Data
- **`Authorization`**: Bearer **`access_token`** ⚠️
```http
PUT /api/data/{key}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `value` | `string` | **Required** (data_value) |

### Delete Data
- **`Authorization`**: Bearer **`access_token`** ⚠️
```http
DELETE /api/data/{key}
```
Example: https:localhost:8080/api/data/4

-Feel free to explore the code and the routes to understand the functionality better.
##### Happy coding! 😄
