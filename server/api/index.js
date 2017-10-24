'use strict';
const express = require('express');
const api = express();

//Mount especific api routes
api.use('/', require('./api-routes'));

module.exports = api;