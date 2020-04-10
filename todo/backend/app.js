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
        task: task,
        message: 'Task added successfully'
    });
});

app.get('/api/get', (req, res, next) => {
    Task.find().then(tasks => {
        res.status(200).json({
            tasks: tasks
        });
    });
});

app.put('/api/update/:id', (req, res, next) => {
    const task = new Task({
        _id: req.params.id,
        content: req.body.content
    });
    Task.updateOne({_id: req.params.id}, task).then(() => {
        res.status(200).json({message: 'Task updated successfully'});
    }).catch((err) => console.log(err));
});

app.delete('/api/delete/:id', (req, res, next) => {
    Task.deleteOne({_id: req.params.id})
    .then(() => {
        res.status(200).json({
            message: 'Task deleted'
        });
    });
});

module.exports = app;
