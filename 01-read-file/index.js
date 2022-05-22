const fs = require('fs');
const path = require('path');

const { stdout } = process;


let filePath = path.join(__dirname, 'text.txt');

const readableStream = fs.createReadStream(filePath);

readableStream.on('error', error => console.log('Error', error.message));
readableStream.on('data', chunk => stdout.write(chunk));
