module.exports = class World{
    constructor(x, y, z, result){
        this.unknownDot = [result.random_point.x, result.random_point.y, result.random_point.z];
        this.setDot = [x, y, z];
        this.lastDistance = this.distanceCalculator();
        this.scale = [9, 3, 1];
        this.scaleIter = 0;
        this.flag = true;
        this.minDiff;
        this.iterator = 0;
        this.history = result;
    }

    distanceCalculator(){
        return Math.sqrt(Math.pow(this.setDot[0] - this.unknownDot[0], 2) + Math.pow(this.setDot[1] - this.unknownDot[1], 2) + Math.pow(this.setDot[2] - this.unknownDot[2], 2));
    }

    //My script is attached to difference in distances, previous and current, and when it's on min point, its the minimum distance to the search point
    //The script running till he got the break point. this.scale is array for moving this.setDot along the axes.
    //this.flag secures in wich side it should move
    //this.iterator is used to calculate number of iterations
    //_helper() is created to absorb repeatless code in one func
    pathFinder(){
        for(var i = 0; i < 3; i++){
            this.scaleIter = 0
            do{
                this.setDot[i] = this.flag ? this.setDot[i] + this.scale[this.scaleIter] : this.setDot[i] - this.scale[this.scaleIter];
                let currentDistance = this.distanceCalculator();
                let diff = this.lastDistance - currentDistance;
                
                // console.log(`x : ${this.setDot[0]} y : ${this.setDot[1]} z : ${this.setDot[2]}`)
                // console.log(`calls ${this.iterator}`)
                this.history['calls'] = this.iterator + 1;
                this.history['search_points'][this.iterator] = {'x' : this.setDot[0],'y' : this.setDot[1],'z' : this.setDot[2]};

        
                if(currentDistance == 0 || this.iterator >= 150){
                    return this.history;
                }else if(diff == this.minDiff){
                    if(i != 2)
                        break;
                }
                else if(diff > 0){
                    this._helper(diff, currentDistance, true);

                    if(this.minDiff == undefined)
                        this.minDiff = diff;
                    this.minDiff = this.minDiff > diff ? diff : this.minDiff;
                }else if(diff < 0){
                    this.flag = !this.flag;

                    this._helper(diff, currentDistance, false);
                } 
                this.iterator++;
                this.lastDistance = currentDistance;
            }while(true);
            this.minDiff = undefined;
            console.log('next iteration');
        }
    }

    _helper(diff, distance, dirrection){
        if(distance <= 10){
            this.scaleIter = 2
        }else if(dirrection ? diff < 1 : diff > -1 ){
            this.scaleIter = 2
        }else if(dirrection ? diff < 2  : diff > -2 ){
            this.scaleIter = 1
        }
    }

}