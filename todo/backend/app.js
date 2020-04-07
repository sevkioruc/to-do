const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Task = require('./models/task.model');

const app = express();

mongoose.connect('mongodb+srv://sevkioruc:abcde@cluster0-6jiof.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected');
})
.catch(() => {
    console.log('Failed');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
});

app.post('/api/create', (req, res, next) => {
    const task = new Task({
        content: req.body.content
    });
    task.save();
    res.status(201).json({
        message: 'Task added successfully'
    });
});

module.exports = app;
