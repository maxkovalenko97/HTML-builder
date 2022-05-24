const fs = require('fs/promises');
const path = require('path');

createCssFile(); 

async function createCssFile() {
  await fs.rm(path.join(__dirname,'project-dist','bundle.css'), { recursive: true, force: true});

  const filesOfStyles = await fs.readdir(path.join(__dirname,'styles'), {withFileTypes: true});
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