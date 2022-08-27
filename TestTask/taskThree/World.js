module.exports = class World{
    constructor(x, y, z, unknownDot){
        this.unknownDot = [unknownDot.x, unknownDot.y, unknownDot.z];
        this.setDot = [x, y, z];
        this.lastDistance = this.distanceCalculator();
        this.scale = [10, 3, 1];
        this.flag = true;
        this.minDiff;
        this.iterator = 0;
    }

    distanceCalculator(){
        return Math.sqrt(Math.pow(this.setDot[0] - this.unknownDot[0], 2) + Math.pow(this.setDot[1] - this.unknownDot[1], 2) + Math.pow(this.setDot[2] - this.unknownDot[2], 2));
    }

    pathFinder(){
        for(var i = 0; i < 3; i++){
            for(var j = 0; j < 3; ){
                this.setDot[i] = this.flag ? this.setDot[i] + this.scale[j] : this.setDot[i] - this.scale[j];
                let currentDistance = this.distanceCalculator();
                let diff = this.lastDistance - currentDistance;
                console.log(`current distance to dot is ${currentDistance}`);
                console.log( `current dot is ${this.setDot}`);
                console.log(`current difference ${diff}`);
                console.log(`last difference ${this.minDiff}`);
                if(currentDistance == 0){
                    return `The unknownDot had been founded!!!! Congrats, ${this.unknownDot.toString()}`;
                }else if(diff == this.minDiff){
                    if(i != 2)
                        break;
                }
                else if(diff > 0){
                    if(diff < 1 || currentDistance < 10){
                        j = 2;   
                    }else if(diff < 2){
                        j = 1;
                    } 
                }else if(diff < 0){
                    this.flag = !this.flag;
                    if(diff > -1 || currentDistance < 10){
                        j = 2;
                    }
                    else if(diff > -2){
                        j = 1;
                    }
                } 
                if(diff > 0){
                    if(this.minDiff == undefined)
                        this.minDiff = diff;
                    this.minDiff = this.minDiff > diff ? diff : this.minDiff;
                }
                this.lastDistance = currentDistance;
                this.iterator++
            }
            this.minDiff = undefined;
            console.log('next iteration');
        }
    }

    _helper(diff, distance){
        this.setDot[i] = this.flag ? this.setDot[i] + this.scale[j] : this.setDot[i] - this.scale[j];
        let curDistance = this.distanceCalculator();
        if(distance == undefined){
            
        }
        diff = distance - curDistance
    }

}