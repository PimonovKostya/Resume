var express = require('express');

var app = express();

var handlbars = require('express-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars', handlbars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

var fortunes = [
    'I asked God for a bike, but I know God doesn’t work that way. So I stole a bike and asked for forgiveness.',
    'I don’t suffer from insanity, I enjoy every minute of it.',
    'A train station is where the train stops. A bus station is where the bus stops. On my desk, I have a work station…',
    'Alcohol does not solve any problems, but then again, neither does milk.',
    'I am nobody. Nobody is perfect. I am perfect.'
]

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res)=>{
    res.render('home');
})

app.get('/about', (req, res)=>{
    var randomeFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', {fortune: randomeFortune});
})

app.use((req, res) => {
    res.status(404);
    res.render('404');
})

app.use((err ,req, res, next) => {
    console.log(err.stack);
    res.status(500);
    res.render('500');
})

app.listen(app.get('port'), ()=> {
    console.log(`Server started at port: ${app.get('port')} \n Press Ctr+C to exit.`)
})