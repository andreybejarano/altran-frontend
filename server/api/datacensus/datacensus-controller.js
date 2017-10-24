'use strict';

const DatacensusService = require('./datacensus-service');
const service = new DatacensusService();

class DatacensusController {
	static async getDatacensus(req, res) {
		try {
			const data = await service.getDatacensus();
			if(data) {
				res.status(200).json(data);
			} else {
				res.status(404).json({message: 'data not found'});				
			}
		} catch (error) {
			res.status(500).json(error);
		}
	}
}

module.exports = DatacensusController;