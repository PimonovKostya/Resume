import Router, { response } from 'express';
import ShemaBuilder from '../models/ShemaBuilder.js'
import localStorage from '../localStorage.js'

const router = new Router();
const model = new ShemaBuilder()

router.get('/cart', async (req, res) => {
    var orders = localStorage.createOrder();
    orders = JSON.parse(orders);
    res.render('cart', {
        title: 'Orders',
        isSelling: true,
        orders
    });
})

router.post('/cart/delete', async (req, res) => {
    localStorage.deleteOrder(req.body.name);
    res.redirect(301, req.originalUrl);
})

router.post('/cart/save', async(req, res) => {
    try{
        var customer = model.orderBook();
        var newModel = new customer({
            Name: req.body.name,
            Email: req.body.mail,
            Phone: req.body.phone,
            Address: req.body.address,
            Price: req.body.price
        })
        await newModel.save();
        localStorage.clearAll();
    }catch(e){
        console.log(e)
    }
})

export default router;   