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

    parseData(){
        var iter = 0;
        let data = this.container.getData();
        data.forEach(object => {
            this.user = new Object();
            
            for(const tag in object){
                this.user[tag] = object[tag];
            }
            this.userCollection[iter] = this.user;
            iter++;
        });
        this.container.setUserCollection(this.userCollection);
    }

    parseCondition(){
        let condition = this.container.getCondition();

        for(const key in condition){
            try{
                this.container[key](condition[key]);
            }catch(e){
                throw e;
                // console.log('++++++++Error!!!! Such condition is not expected.+++++++++++');
            }
        }
    }
}