const fs = require('fs');
const path = require('path');
const process = require('process');
const {stdin, stdout} = process;


let pathText = path.join(__dirname, 'text.txt');

stdout.write('\n--- Введите текст ---\n');

const output = fs.createWriteStream(pathText, 'utf-8');



process.on('SIGINT', () => {
  process.exit();
});

process.on('exit', () => console.log('\n--- Ввод текста завершён --- '));

stdin.on('data', chunk => {
  if(chunk.toString().trim() == 'exit') {
    process.exit();
  }
  output.write(chunk);
});

