'use strict';

const expressApp = require('express')();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const config = require('./config/env/');
const basePath = '/altran-front/';

// logs to console minimal information
// :method :url :statusCode :time :content length
if (config.env !== 'production') {
	expressApp.use(morgan('dev'));
}

// parse body params and attach them to req.body
expressApp.use(bodyParser.json());
expressApp.use(bodyParser.urlencoded({ extended: true }));

// disable 'X-Powered-By' header in response
expressApp.disable('x-powered-by');

//Require and mount api application
expressApp.use(`${basePath}api`, require('./api'));

//Require and mount app application
expressApp.use(basePath, require('./app'));

// listen on port config.port
expressApp.listen(config.port, () => {
	console.log(`server started on port ${config.port} (${config.env})`);
});
