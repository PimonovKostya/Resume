import Router, { response } from 'express';
import ShemaBuilder from '../models/ShemaBuilder.js'

const router = new Router();
const model = new ShemaBuilder()

router.get('/orderBook', async (req, res) => {
    var orders = await model.getOrderBook().find({}).lean();

    res.render('orderBook', {
        title: 'Custommers',
        orders
    })
})

router.get('/about', (req, res)=>{
    res.render('about');
})

export default router;   