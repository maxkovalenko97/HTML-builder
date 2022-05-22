const fs = require('fs');
const path = require('path');

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
    const bundle = path.join(__dirname,'project-dist','bundle.css');
    const currentFile = path.join(__dirname, 'styles', file);

    fs.readFile(currentFile, 'utf8', function(err, data){
        fs.appendFile(bundle, data, (err) => {
            if (err) throw err;
        })
    });
}