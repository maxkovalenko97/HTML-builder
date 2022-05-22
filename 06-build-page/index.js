const fs = require('fs');
const path = require('path');

//create project-dist
fs.mkdir(path.join(__dirname, 'project-dist'), {recursive: true}, err => {
    if(err) throw err;
})

const template = path.join(__dirname, 'template.html');
const index = path.join(__dirname, 'project-dist', 'index.html');
const components = path.join(__dirname, 'components');


fs.readFile(template, 'utf-8', (err, data) => {
    if (err) throw err;
    toComponents(data);
});


function toComponents(cont) {
    fs.readdir(components, (err, files) => {
        if(err) console.log(err);

        files.forEach(file => {
            let fileName = path.parse(file).name;
            let re = `{{${fileName}}}`;

            fs.readFile(path.join(components, file), 'utf-8', (err, data) => {
                if (err) throw err;
                cont = cont.replace(re, data);

                fs.writeFile(index, cont, (err) => {
                    if (err) throw err;
                    console.log(`Add ${fileName}`);
                });
            })
        })
    })
}











///////////////////////////////////////
const pathToStyles = path.join(__dirname,'styles');

fs.readdir(pathToStyles,{ withFileTypes: true }, (err, files) => {
    if(err) console.log(err);

    else {
        files.forEach(file => {
            path.extname(file.name) === '.css' ? addToBundle(file.name) : true;
        });
    }
})

function addToBundle(file){
    const bundle = path.join(__dirname,'project-dist','style.css');
    const currentFile = path.join(__dirname, 'styles', file);

    fs.readFile(currentFile, 'utf8', function(err, data){
        fs.appendFile(bundle, data, (err) => {
            if (err) throw err;
        })
    });
}
















///////////////////////////////////////////

function makeDirectory(way) {
    fs.mkdir(way, { recursive: true }, err => {
        if (err) throw err;
    });
}


const copyFrom = path.join(__dirname, 'assets');
const copyTo = path.join(__dirname, 'project-dist', 'assets');

function deepCopy(way, to){
    fs.readdir(way, (err, files) => {
       if(err) throw err;
 
       for (let file of files){
          fs.stat(path.join(way,file), (errStat, status) => {   
             if(errStat) throw errStat;
 
             if(status.isDirectory()){
                makeDirectory(to + '/' + file);
                deepCopy(way + '/' + file, to + '/' + file);
                
             }else{
                fs.copyFile(path.join(way,file), path.join(to, file), (err) => {
                    if (err) throw err;
                });
             }
          });
       }
    });
 }

 deepCopy(copyFrom, copyTo);




