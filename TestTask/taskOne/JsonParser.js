module.exports = class jsonParser{

    constructor(convertTable){
        this.convertTable = convertTable;
        this.value;
        this.result_unit;
        this.relation = [];
    }

    inputJSON(data){
        try{
            this.value = data.distance.unit;
            this._scaleFinder(this.value);

            this.result_unit = data.convert_to;
            this._scaleFinder(this.result_unit);
        }catch(e){
            throw new Error(`Invalid input data ${e}`);      //if data inputs in wrong format Exception will be thrown
        }
        
    }

    createJSON(unit, value){
        var obj = {
            "unit":  unit,
            "value": value
        }
        return obj;
    }

    //private method created to find out the unit in table and if it's exist write the relation according
    //to type like [imperic, metric], wich simply like [key] in convert.json table
    //it means that we converting from imperic to metric num system.
    _scaleFinder(unit){
        try{
            Object.keys(this.convertTable).forEach(scale => {
                for(const index in this.convertTable[scale]){
                    if(index == unit){
                        this.relation.push(scale);
                    }
                }
            });
        }catch(e){
            throw new Error(`Needed unit is not implemented in table.json file, or it\'s doesn\'t exist. \n${e}`);
        }
        
    }
}