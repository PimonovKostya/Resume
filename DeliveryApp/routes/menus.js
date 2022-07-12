import Router, { response } from 'express';
import ShemaBuilder from '../models/ShemaBuilder.js'

const router = new Router();
const model = new ShemaBuilder()

router.get('/', async (req, res)=>{
    
    const orders = await model.getModel().find({}).lean();

    res.render('index',{
        title: 'Shops',
        isCreate: true,
        orders
    });
})

router.get('/cart', async (req, res) => {
    const orders = await model.cartBook().find({}).lean();

    res.render('cart', {
        title: 'Orders',
        isSelling: true,
        orders
    });
})

router.post('/cart/delete', async (req, res) => {
    try{
        var m = model.cartBook();
        await m.findOneAndRemove({
            name: req.body.name,
        })
    }catch(e){
        console.log(e);
    }
    res.redirect('/cart')
})

router.post('/create', async(req, res)=>{ 
    var m = model.cartBook()
    var nmodel = new m({
        name: req.body.name,
        discription: req.body.discription,
        price: req.body.price.match('^\[0-9]+')[0]
    });
    await nmodel.save();
    res.redirect('/')
})

router.post('/cart/save', async(req, res) => {
    var customer = model.orderBook();
    var newModel = new customer({
        Name: req.body.name,
        Email: req.body.email,
        Phone: req.body.phone,
        Address: req.body.address,
        Price: req.body.price
    })
    await newModel.save();
    var oldOrders = model.cartBook();
    oldOrders.deleteMany({});
    res.redirect('/');
})

router.get('/McDonny', async (req, res) => {
    model.changeName('McDonny')
})

router.get('/CFK', (req, res) => {
    model.changeName('CFK')
})

router.get('/Bufette', (req, res) => {
    model.changeName('Bufette')
})

router.get('/TwoPrice', (req, res) => {
    model.changeName('TwoPrice')
})

export default router;   