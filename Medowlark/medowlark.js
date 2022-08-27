var express = require('express');
var fortune = require('./lib/fortune.js');

var app = express();

var handlbars = require('express-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars', handlbars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);



app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
    next();
});

app.get('/', (req, res)=>{
    res.render('home');
});

app.get('/about', (req, res)=>{
    res.render('about', {
        fortune: fortune.getFortune(),
        pageTestScript: '/qa/tests-about.js'
    });
});

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