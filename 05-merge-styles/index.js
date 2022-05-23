const fs = require('fs/promises');
const path = require('path');

createCssFile(); 

async function createCssFile() {
  const pathToStyles = path.join(__dirname,'styles');
  const filesOfStyles = await fs.readdir(pathToStyles, {withFileTypes: true});
  const bundle = path.join(__dirname,'project-dist','bundle.css');
    
  for(let file of filesOfStyles) {
    if(path.extname(file.name) === '.css') {
      await addToBundle(file.name);
    } 
  }

  async function addToBundle (file) {
    const currentFile = path.join(__dirname, 'styles', file);
    const dataFile = await fs.readFile(currentFile, 'utf-8');
    await fs.appendFile(bundle, dataFile);
  }
}