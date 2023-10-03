// Import the 'request' library and 'fs' module.
const request = require('request');
const fs = require('fs');

// Get the URL and file path from command-line arguments.
const url = process.argv[2];
const filePath = process.argv[3];

// Make an HTTP request to the provided URL.
//const request = require('request');
request('http://www.example.edu/index.html', (error, response, body) => {
    if (error) {
        console.error('Error:', error);
        process.exit(1);
    }

    if (response.statusCode !== 200) {
        console.error(`HTTP request failed with status code ${response.statusCode}`);
        process.exit(1);
    }

    // Write the response body to the specified file path.
    fs.writeFile(filePath, body, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            process.exit(1);
        }

        // Calculate the file size (number of bytes) and print a success message.
        const fileSize = Buffer.from(body).length;
        console.log(`Downloaded and saved ${fileSize} bytes to ${filePath}`);
    });
});