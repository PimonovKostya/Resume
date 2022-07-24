import mongoose from "mongoose";

export default class SchemaBuilder{
    constructor(){
        this.shopName = 'McDonny'
        this.schema = new mongoose.Schema({
            name: {
                type: String,
            },
            discription: {
                type: String,
            },
            price: {
                type: Number,
            },
            img: {
                type: String,
            }
        });

        this.customer = new mongoose.Schema({
            Name: {
                type: String,
            },
            Email: {
                type: String,
            },
            Phone: {
                type: String,
            },
            Address: {
                type: String,
            },
            Price: {
                type: String,
            },
        })
    }

    changeName(name){
        this.shopName = name;
    }

    cartBook(){
        return mongoose.model('wtf?', this.schema, 'CartBook');
    }

    orderBook(){
        return mongoose.model('order', this.customer, 'OrderBook');
    }

    getOrderBook(){
        return mongoose.model('getOrder', this.customer, 'OrderBook');
    }

    getModel(){
        return mongoose.model('wtf?', this.schema, this.shopName);
    }
}
