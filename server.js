// Required modules
const express = require('express'); // Importing Express framework
const app = express(); // Creating an instance of Express
const multer = require('multer'); // Importing Multer for handling file uploads
const upload = multer({ dest: 'uploads/' }); // Setting upload directory for Multer
const fs = require('fs'); // Importing the File System module for file operations
const csv = require('csv-parser'); // Importing CSV parser module for parsing CSV files
const port = 3001; // Setting the port number for the server

// Setting up middleware
app.use(express.static('public')); // Serving static files from the 'public' directory
app.use(express.urlencoded({ extended: true })); // Parsing URL-encoded bodies

// Connecting to the database and importing utility functions
const connection = require('./db'); // Importing the database connection
const { checkTableAndInsert, parseRecords } = require('./dataUtils'); // Importing utility functions

// Handling GET request to the root URL
app.get('/', (req, res) => {
    // Sending the 'index.html' file as the response
    res.sendFile(__dirname + '/public/index.html');
});

// Handling file upload and CSV processing
const uploadCSV = async (req, res) => {
    const file = req.file; // Getting the uploaded file

    if (!file) {
        return res.status(400).send('Please upload a CSV file'); // If no file is uploaded, return an error
    }

    const createReadStream = fs.createReadStream(file.path); // Creating a readable stream from the uploaded file

    const parser = createReadStream.pipe(csv({
        columns: true,
        skip_empty_lines: true
    })); // Configuring CSV parser with options

    let records = await parseRecords(parser); // Parsing CSV records into an array

    if (records.length) {
        checkTableAndInsert(records, connection, res); // If there are records, check table and insert data
    } else {
        return res.send('File uploaded and data imported successfully'); // If no records, send success message
    }
};

// Handling POST request to the '/upload' endpoint with file upload middleware
app.post('/upload', upload.single('csvFile'), uploadCSV);

// Starting the server and listening on the specified port
app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
});
