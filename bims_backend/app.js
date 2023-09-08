const express = require('express');
const routes = require('./routes/index');
const mongoose = require('mongoose');
const cors = require('cors');

const port = 2023;
const host = 'localhost';
const app = express();
app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use('/', routes);
mongoose.connect('mongodb+srv://aditya:tX7y5P6FoFer5OuH@zomatoclone.12piz.mongodb.net/BookDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(res => {
        app.listen(port, host, () => {
            console.log(`server is running  at ${host}:${port}`);

        });
    }).catch(err => console.log(err))