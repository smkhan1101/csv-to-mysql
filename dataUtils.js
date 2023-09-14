/**
 * Module: dataUtils.js
 * Description: This module contains utility functions for processing and inserting data into a MySQL database.
 */

let records = []; // Array to store records extracted from CSV

/**
 * Function: isEmptyObject(obj)
 * Description: Checks if an object is empty (has no non-null, non-empty properties).
 * @param {Object} obj - The object to be checked.
 * @returns {boolean} - Returns true if the object is empty, otherwise false.
 */
const isEmptyObject = (obj) => {
    for (var key in obj) {
        if (obj[key] !== null && obj[key] != "")
            return false;
    }
    return true;
}

/**
 * Function: parseRecords(parser)
 * Description: Parses records from a CSV parser and stores non-empty records in the 'records' array.
 * @param {CSVParser} parser - The CSV parser stream to read records from.
 * @returns {Promise<Array>} - A promise that resolves to an array of parsed records.
 */
async function parseRecords(parser) {
    parser.on('readable', async function () {
        let record;
        while (record = parser.read()) {
            if (!isEmptyObject(record)) {
                records.push({
                    average_GPA: record['Average GPA'],
                    City: record['City'],
                    ACT_composite: record['ACT composite']
                });
            }
        }
    });

    return new Promise((resolve, reject) => {
        parser.on('end', () => resolve(records));
        parser.on('error', reject);
    });
}

/**
 * Function: insertData(records, connection, res)
 * Description: Inserts records into a MySQL table.
 * @param {Array} records - An array of records to be inserted.
 * @param {Connection} connection - The MySQL database connection.
 * @param {Response} res - The HTTP response object to send a message when insertion is complete.
 */
const insertData = (records, connection, res) => {
    for (let i = 0; i < records.length; i++) {
        const record = records[i];
        const keys = Object.keys(record);
        const values = keys.map(key => (record[key] === undefined) ? 'NULL' : `'${record[key]}'`).join(', ');

        const insertQuery = `
            INSERT INTO your_table (${keys.join(', ')}) 
            VALUES (${values});
        `;

        connection.query(insertQuery, (err, results, fields) => {
            if (err) throw err;

            console.log(`Row ${i} inserted.`);

            if (i === records.length - 1) {
                // All rows inserted, send success message
                records = []
                connection.end();
                res.send('Data inserted successfully')
            }
        });
    }
};

/**
 * Function: createTable(data, connection)
 * Description: Creates a MySQL table based on the keys of the first record in the 'data' array.
 * @param {Array} data - An array of records.
 * @param {Connection} connection - The MySQL database connection.
 */
const createTable = (data, connection) => {
    const keys = Object.keys(data[0]);

    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS your_table (
            ${keys.map(key => `${key} VARCHAR(255)`).join(',\n')}
        );
    `;

    connection.query(createTableQuery, (err, results, fields) => {
        if (err) throw err;

        console.log('Table created or already exists.');

        insertData(records, connection, res);
    });
};

/**
 * Function: checkTableAndInsert(records, connection, res)
 * Description: Checks if the target table exists and either creates it or inserts data directly.
 * @param {Array} records - An array of records to be inserted.
 * @param {Connection} connection - The MySQL database connection.
 * @param {Response} res - The HTTP response object to send a message when insertion is complete.
 */
const checkTableAndInsert = (records, connection, res) => {
    const checkTableQuery = "SHOW TABLES LIKE 'your_table';";

    connection.query(checkTableQuery, (err, results, fields) => {
        if (err) throw err;

        if (results.length === 0) {
            // Table does not exist, create it
            createTable(records, connection, res);
        } else {
            // Table exists, insert data directly
            insertData(records, connection, res);
        }
    });
};

module.exports = {
    isEmptyObject,
    parseRecords,
    insertData,
    createTable,
    checkTableAndInsert
};
