module.exports = class JsonParser{
    constructor(container){
        this.user;
        this.userCollection = [];
        this.container = container;
    }

    parseInput(inputJson){
        this.container.setData(inputJson.data);
        this.container.setCondition(inputJson.condition);
    }

    //method parses input data to array of objects and returns it to container
    parseData(){
        var iter = 0;
        let data = this.container.getData();
        try{
            data.forEach(object => {
                this.user = new Object();
                
                for(const tag in object){
                    this.user[tag] = object[tag];
                }
                this.userCollection[iter] = this.user;
                iter++;
            });
            this.container.setUserCollection(this.userCollection);
        }catch(e){
            throw new Error(`Invalid input data \n${e}`);
        }
    }

    //method parses input condition data and uses methods from container
    parseCondition(){
        let condition = this.container.getCondition();
        for(const key in condition){
            try{
                this.container[key](condition[key]);        //this stroke causes method by its [key] parameter if [key] equals to methods name
            }catch(e){
                throw new Error(`Invalid input condition \n${e}`);
            }
        }
    }
}