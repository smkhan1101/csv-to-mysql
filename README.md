# Project Name
Tuan Ma

## Description
This project is designed to convert data from CSV (Comma Separated Values) files into a MySQL database. It automates the process of parsing CSV files, creating tables (if necessary), and inserting data into MySQL..

## Features
CSV Parsing: The project can read data from CSV files, extracting records for insertion into the database.

Dynamic Table Creation: If the target table doesn't exist, the project dynamically creates it based on the structure of the data.

Efficient Data Insertion: It efficiently inserts data into the MySQL database, handling both existing and newly created tables.

Configurable Database Connection: The project allows you to specify database credentials and connection details through environment variables or configuration files.

## Technologies Used
Node.js: The project is written in JavaScript, leveraging Node.js for server-side scripting.

MySQL: MySQL is used as the database management system for data storage.

CSV Parser: A CSV parsing library is utilized to efficiently read and process data from CSV files.

dotenv: This package is employed to load environment variables from a .env file.



CSV to MySQL Project
Description
This project is designed to convert data from CSV (Comma Separated Values) files into a MySQL database. It automates the process of parsing CSV files, creating tables (if necessary), and inserting data into MySQL.

Features
CSV Parsing: The project can read data from CSV files, extracting records for insertion into the database.

Dynamic Table Creation: If the target table doesn't exist, the project dynamically creates it based on the structure of the data.

Efficient Data Insertion: It efficiently inserts data into the MySQL database, handling both existing and newly created tables.

Configurable Database Connection: The project allows you to specify database credentials and connection details through environment variables or configuration files.

Technologies Used
Node.js: The project is written in JavaScript, leveraging Node.js for server-side scripting.

MySQL: MySQL is used as the database management system for data storage.

CSV Parser: A CSV parsing library is utilized to efficiently read and process data from CSV files.

dotenv: This package is employed to load environment variables from a .env file.

Installation
Clone the repository to your local machine.
Install the necessary dependencies using npm install.

## Installation
Clone the repository to your local machine.
Install the necessary dependencies using npm install.

```bash
# Example installation command
npm install

```
## Usage
Prepare your CSV file(s) with the data you want to import.
Set up your MySQL database and note down the credentials (host, user, password, database name).
Create a .env file in the project root with the following content:

```bash
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_DATABASE=your_database_name
```

Running the Project
```bash
npm start
```

