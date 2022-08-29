const World = require('./World.js');
const random = require('./randomGenerator.js');

module.exports = class JsonParser{
    constructor(){
        this.result = {
            'result' : {
                'random_point' : {x : random.x, y : random.y, z : random.z},
                'search_points' : [],
                'calls' : 0
            }
        };
        this.calls;
    }

    parseInput(data){
        for(const key in data){
            if(typeof(data[key]) != "number"){
                throw new Error(`${data[key]} is not a number`)
            }else if(data[key] > 100 || data[key] < 0){
                throw new Error(`${key} : ${data[key]} is incorrect value`)
            }
        }
        this.world = new World(data.x, data.y, data.z, this.result.result);
        
    }

    parseOutput(){
        return this.world.pathFinder();
    }
}