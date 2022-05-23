const fs = require('fs/promises');
const path = require('path');

createBundle();

async function createBundle() {
  try {
    await createDirectory(path.join(__dirname, 'project-dist'));
    await insertComponents();
    await createCssFile();
    await copyDirectory();
  }
  catch(err) {
    console.log(err);
  }
    
}

//create project-dist
async function createDirectory (path) {
  await fs.mkdir(path, {recursive: true});
}

async function insertComponents() {
  const pathToComponents = path.join(__dirname, 'components');

  let templateContent = await fs.readFile(path.join(__dirname, 'template.html'), 'utf-8');
  const componentsFilesNames = await fs.readdir(pathToComponents);

  for(let file of componentsFilesNames) {
    const re = `{{${path.parse(file).name}}}`;
    const fileContent = await fs.readFile(path.join(pathToComponents, file), 'utf-8');
    templateContent = templateContent.replace(re, fileContent);
  }

  await fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), templateContent);
}

async function createCssFile() {
  const pathToStyles = path.join(__dirname,'styles');
  const filesOfStyles = await fs.readdir(pathToStyles, {withFileTypes: true});
  const bundle = path.join(__dirname,'project-dist','style.css');
    
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


async function copyDirectory() {
  const copyFrom = path.join(__dirname, 'assets');
  const copyTo = path.join(__dirname, 'project-dist', 'assets');

  deepCopy(copyFrom, copyTo);
  async function deepCopy(from, to){
    const contentDir = await fs.readdir(from);

    for(let obj of contentDir) {
      let stat1 = await fs.stat(path.join(from, obj));
      if (stat1.isDirectory()) {
        await createDirectory(to + '/' + obj);
        await deepCopy(from + '/' + obj, to + '/' + obj); ///////////////
      } else {
        await fs.copyFile(path.join(from, obj), path.join(to, obj));
      }
    }
  }
}



