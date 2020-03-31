const mongoose = require('mongoose');
const express = require('express');
const { DB, OPTIONS } = require('./config');
const routes = require('./routes');

mongoose.connect(DB, OPTIONS)
    .then(() => console.log('Mongoose is running...'))
    .catch(e => {
        console.log(e.message);
        process.exit();
    });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', routes);

module.exports = app;