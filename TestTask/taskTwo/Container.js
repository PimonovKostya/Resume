module.exports = class Container{
    constructor(){
        this.data;
        this.condition;
        this.userCollection;
        this.parameter;
    }
    //setters
    setData(data){
        this.data = data;
    }
    setCondition(condition){
        this.condition = condition;
    }
    setUserCollection(userCollection){
        this.userCollection = userCollection;
    }
    //getters
    getData(){
        return this.data;
    }

    getCondition(){
        return this.condition;
    }
    getUserCollection(){
        let result;
        return result ={
            "result" : this.userCollection
        } 
    }
    //filters
    filterByPar(flag){
        return (element) => {
            const propsEl = Object.getOwnPropertyNames(element);
            const propsPar = Object.getOwnPropertyNames(this.parameter);

            for(var i = 0; i < propsEl.length; i++){
                if(propsPar == propsEl[i]){
                    return flag ? element[propsEl[i]] == this.parameter[propsPar] : element[propsEl[i]] != this.parameter[propsPar];
                }
            }
        }
    }

    //methods of Conditions, you can add some of them here if you need to
    //if there is some condition in JSON that haven't the similar name as method, Exception will follow
    //look in JsonParser.parseCondition() method for more
    sort_by(sortTag){
        let sorter = (a, b) => a[sortTag] > b[sortTag] ? 1 : -1;
        this.userCollection.sort(sorter)
    }

    include(parameter){
        this.parameter = parameter[0];
        this.userCollection = this.userCollection.filter(this.filterByPar(true));
    } 

    exclude(parameter){
        this.parameter = parameter[0];
        this.userCollection = this.userCollection.filter(this.filterByPar(false));
    }

    
}