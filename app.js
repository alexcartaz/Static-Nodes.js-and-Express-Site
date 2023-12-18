const express = require('express');
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
const data = require('./data.json');

const app = express();

app.use('/static', express.static('public'));

app.set('view engine', 'pug');

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
    /*res.render('project', {project: {
        "project_name": "a",
        "description": "b",
        "technologies": ["CSS"],
        "live_link": "c",
        "github_link": "d",
        "image_urls": ['','']

    }});*/
});

//404 handler; handling non-matching request from the client
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//global error handler
app.use((error, req, res, next) => {
    console.log('4')
    if(!error.status){
        console.log('error message missing status');
        error.status = 'missing';
    }
    console.log('5')
    if(!error.message){
        console.log('error message missing status');
        error.message = 'missing';
    }
    console.log('6')
    console.log(`Error: ${error.status} ${error.message}`);
    res.status(error.status).send(`<h1>${error.message}</h1>`)
});


app.listen(3000);