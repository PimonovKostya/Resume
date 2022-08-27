module.exports = class jsonParser{

    constructor(convertTable){
        this.convertTable = convertTable;
        this.value;
        this.result_unit;
        this.relation = [];
    }

    inputJSON(data){
        this.value = data.distance;
        this._scaleFinder(this.value.unit);

        this.result_unit = data.convert_to;
        this._scaleFinder(this.result_unit);
    }

    createJSON(unit, value){
        var obj = {
            "unit":  unit,
            "value": value
        }
        return obj;
    }

    _scaleFinder(unit){
        Object.keys(this.convertTable).forEach(scale => {
            for(const index in this.convertTable[scale]){
                if(index == unit){
                    this.relation.push(scale);
                }
            }
        });
    }
}