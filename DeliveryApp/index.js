import express from "express";
import mongoose from "mongoose";
import exphbs from 'express-handlebars';
import menuRouter from './routes/menus.js';
import path from 'path'
import bodyParser from "body-parser";

const DB_URL = 'mongodb+srv://User1:123qwe@cluster0.qulsacy.mongodb.net/test';
const PORT = process.env.PORT || 8000;

const app = express();
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}))
app.use(menuRouter);

app.use('/style.css', express.static(path.resolve('views', 'styles', 'styles.css')))
app.use('/functions/func.js' ,express.static(path.resolve('views', 'functions', 'func.js')));
app.use('/functions/cart.js', express.static(path.resolve('views', 'functions', 'cart.js')));

// // app.use('/', router)

// app.get('/', (req, res) =>{
//     res.render('views/index');
// });

// app.use('/cart', express.static(path.resolve('public', 'cart')));

// app.get('/', (req, res) => {
//     res.sendFile(path.resolve('public', 'store', 'store.html'));
// })

// app.get('/cart', (req, res) => {
//     res.sendFile(path.resolve('public', 'cart', 'cart.html'));
// })

async function start(){
    try{
        await mongoose.connect(
            DB_URL ,{
                useUnifiedTopology: true,
                useNewUrlParser: true
            });
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
    }catch(e){
        console.log(e);
    }
}

start();

