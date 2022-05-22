const fs = require('fs');
const path = require('path');

const pathToDir = path.join(__dirname,'secret-folder');


fs.readdir(pathToDir, { withFileTypes: true }, (err, files) => {
    if(err) console.log(err);
    else {
        files.forEach(file =>{
                fs.stat(path.join(pathToDir,file.name), (error, stats) => {
                    if(error) console.log(error);

                    else if(stats.isFile()) {
                        let result = '';
                        result += `${path.parse(file.name).name} - ${path.parse(file.name).ext.slice(1)} - ${stats.size/1024}kb`
                        console.log(result);
                    }
                })
        })
    }
});
