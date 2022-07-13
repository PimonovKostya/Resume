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

router.get('/orderBook', async (req, res) => {
    var orders = await model.orderBook().find({}).lean();

    res.render('orderBook', {
        title: 'Custommers',
        orders
    })
})

router.get('/about', (req, res)=>{
    res.render('about');
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
        Email: req.body.mail,
        Phone: req.body.phone,
        Address: req.body.address,
        Price: req.body.price
    })
    await newModel.save();
    var oldOrders = model.cartBook();
    await oldOrders.deleteMany({}).lean();
    await res.redirect('/')
})

router.post('/click', (req, res) => {
    model.changeName(req.body.btn)
})



export default router;   