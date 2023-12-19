const express = require('express');
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
const data = require('./data.json');
//let favicon = require('serve-favicon');

const app = express();

app.use('/static', express.static('public'));

app.set('view engine', 'pug');


//app.use(favicon('/static/images/favicon.ico'));

console.log('0')
// app.use(bodyParser.urlencoded({ extended: false}));
// app.user(cookieParser());

//index route to render "Home" page
app.get('/', (req, res) => {
    req.locals = data.projects;
    console.log('1');
    res.render('index', {projects: data.projects});
});

//about route to render about page
app.get('/about', (req, res) => {
    console.log('2')
    res.render('about');
});

//dynamic projects routes
app.get('/project/:id', (req, res) => {
    console.log('3.1')
    res.render('project', {project: data.projects[req.params.id-1]});
});

//404 handler; handling non-matching request from the client
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    console.log('404')
    next(err);
});

//global error handler
app.use((err, req, res, next) => {
    if(!err.status){
        console.log('error message missing status');
        err.status = 'missing';
    }
    if(!err.message){
        console.log('error message missing status');
        err.message = 'missing';
    }
    if(err.status === 404){
        console.log('0')
        res.render('page-not-found', {err});
    }else{
        console.log('1')
        res.render('error', {err});
    }
    //res.status(error.status).send(`<h1>${error.message}</h1>`)
});


app.listen(3000);