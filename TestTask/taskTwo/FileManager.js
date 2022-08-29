const fs = require('fs');
const path = require('path');

module.exports = class FileManager{
    constructor(container){
        this.container = container;
    }

    readFile(path){
        try{
            return JSON.parse(fs.readFileSync(path));
        }catch(e){
            throw new Error(`No input file './input/data.json' \n ${e}`);
        }
        
    }
    
    writeFile(path, data){
        return fs.writeFile(path, JSON.stringify(data), (err) => {
            if(err) throw err;
        })
    }
}

