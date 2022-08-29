module.exports = class Math{
    constructor(convert, table){
        this.convert = convert;
        this.table = table;
    }

    //method to scale the unit from imperic system to yards and metric to meters 
    //or converts to needed unit
    converter(value, scale, unit, isMean){
        let actions = {
            true: (a, b) => a * b,
            false: (a, b) => a / b
        }
        return actions[isMean](value, this.table[scale][unit]);     //it looks teriible, but i amused with
    }                                                               //those things i can do in JS with data types
                                                                    //i'm so sorry for that. isMean is boolean :D

    //converts value to needed numeric system
    numericSystemConverter(relation, value){
        return value * this.convert[relation.toString()];
    }
}