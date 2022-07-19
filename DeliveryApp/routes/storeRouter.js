import Router, { response } from 'express';
import ShemaBuilder from '../models/ShemaBuilder.js'
import localStorage from '../localStorage.js'

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

router.post('/create', async(req, res)=>{ 
    localStorage.addOrder(req.body.name, req.body.discription, req.body.price, req.body.img)
    res.redirect('/')
})



router.post('/click', (req, res) => {
    model.changeName(req.body.btn)
})

export default router;   