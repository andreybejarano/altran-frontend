'use strict';

const express = require('express');
const app = express();

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

app.use('/build', express.static('build'));

app.use('/fonts', express.static('build/fonts'));

//Mount especific app routes
app.use(require('./app-routes'));

module.exports = app;

