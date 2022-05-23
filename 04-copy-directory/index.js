const fs = require('fs/promises');
const path = require('path');


copyDirectory(path.join(__dirname, 'files'), path.join(__dirname, 'files-copy'));

async function copyDirectory(from, to) {
  await fs.rm(to, { recursive: true, force: true});
  await fs.mkdir(to, {recursive: true});
  const copyFrom = from;
  const copyTo = to;

  deepCopy(copyFrom, copyTo);
  async function deepCopy(from, to){
    const contentDir = await fs.readdir(from);

    for(let obj of contentDir) {
      let stat1 = await fs.stat(path.join(from, obj));
      if (stat1.isDirectory()) {
        await fs.mkdir(to + '/' + obj, {recursive: true});
        await deepCopy(from + '/' + obj, to + '/' + obj); ///////////////
      } else {
        await fs.copyFile(path.join(from, obj), path.join(to, obj));
      }
    }
  }
}