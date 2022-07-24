import { LocalStorage } from 'node-localstorage';

class localStorage{
    constructor(){
        this.orderStorage = new LocalStorage('/scratch');
    }
    addOrder(name, discription, price, img, count){
        this.orderStorage.setItem(name, discription + '|' + price + '|' + img + '|' + count)
    }
    deleteOrder(name){
        this.orderStorage.removeItem(name);
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
                count: val[3]
            });
        }
        return JSON.stringify(orders);
    }
}

export default new localStorage;