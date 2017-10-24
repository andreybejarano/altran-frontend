const express = require('express');
const router = express.Router();
const DatacensusController = require('./datacensus/datacensus-controller');

router.get('/datacensus', DatacensusController.getDatacensus);

module.exports = router;
