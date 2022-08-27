module.exports = class Math{
    constructor(convert, table){
        this.convert = convert;
        this.table = table;
    }

    balancer(value, scale, unit){
        if(unit != 'm' || unit != 'yd'){
            return this.table[scale][unit] * value;
        }else{
            return value;
        }
    }

    converter(relation, value){
        return value * this.convert[relation.toString()];
    }
}