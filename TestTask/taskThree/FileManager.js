const fs = require('fs');

module.exports = class FileManager{
    readFile(path){
        return JSON.parse(fs.readFileSync(path));
    }
    
    writeFile(path, data){
        return fs.writeFile(path, JSON.stringify(data), (err) => {
            if(err) throw err;
        })
    }
}
