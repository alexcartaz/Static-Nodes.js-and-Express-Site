const express = require('express');
const data = require('./data.json');
const app = express();
app.use('/static', express.static('public'));
app.set('view engine', 'pug');

//route to render index/"Home" page
app.get('/', (req, res) => {
    req.locals = data.projects;
    res.render('index', {projects: data.projects});
});

//route to render about page
app.get('/about', (req, res) => {
    res.render('about');
});

//dynamic projects routes
app.get('/project/:id', (req, res) => {
    res.render('project', {project: data.projects[req.params.id-1]});
});

//404 handler; handling non-matching request from the client
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//global error handler
app.use((err, req, res, next) => {
    //if no status, adds one
    if(!err.status){
        err.status = 'missing';
    }
    //if no message, adds one
    if(!err.message){
        err.message = 'missing';
    }
    //if 404, render 404 page
    if(err.status === 404){
        res.render('page-not-found', {err});
    }else{
        //otherwise render generic error
        res.render('error', {err});
    }
});

app.listen(3000);