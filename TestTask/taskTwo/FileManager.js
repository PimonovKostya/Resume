const fs = require('fs');
const path = require('path');

module.exports = class FileManager{
    constructor(container){
        this.container = container;
    }

    readFile(path){
        return JSON.parse(fs.readFileSync(path));
    }
    
    writeFile(path, data){
        return fs.writeFile(path, JSON.stringify(data), (err) => {
            if(err) throw err;
        })
    }
}

