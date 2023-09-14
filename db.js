/**
 * Module: db.js
 * Description: This module establishes a connection to a MySQL database using the 'mysql' package.
 */

const mysql = require('mysql'); // Importing the MySQL package for database connection
require('dotenv').config(); // Loading environment variables from a .env file

// Creating a connection object with the provided database credentials
const connection = mysql.createConnection({
    host: process.env.DB_HOST, // Database host address
    user: process.env.DB_USER, // Database username
    password: process.env.DB_PASSWORD, // Database password
    database: process.env.DB_DATABASE // Database name
});

// Establishing a connection to the database
connection.connect((err) => {
    if (err) throw err; // If an error occurs during connection, throw an error
    console.log('Connected to MySQL database'); // Log a success message if connection is successful
});

module.exports = connection; // Exporting the connection object for use in other modules
