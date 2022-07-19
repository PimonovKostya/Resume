import { LocalStorage } from 'node-localstorage';

class localStorage{
    constructor(){
        this.orderStorage = new LocalStorage('/scratch');
    }
    addOrder(name, discription, price, img){
        this.orderStorage.setItem(name, discription + '|' + price + '|' + img)
    }
    deleteOrder(name){
        this.orderStorage.renoveItem(name);
    }
    clearAll(){
        this.orderStorage.clear()
    }
    createOrder(){
        var orders = [];
        for(var i = 0; i < this.orderStorage.length; i++){
            const name = this.orderStorage.key(i);
            const val = this.orderStorage.getItem(name).split('|');
            orders[i] = ({
                img: val[2],
                name: name,
                discription: val[0],
                price: val[1],
            });
        }
        return JSON.stringify(orders);
    }
}

export default new localStorage;