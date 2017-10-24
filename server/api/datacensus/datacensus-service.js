'use strict';
const config = require('../../config');
const request = require('request-promise');

class DatacensusService {
	getDatacensus() {
		const options = {
			method: 'GET',
			uri: `${config.endpoints.censusList}`,
			json: true
		};
		return new Promise((resolve, reject) => {
			request(options)
				.then(data => {
					resolve(data);
				})
				.catch(error => {
					reject(new Error(error));
				});
		});
	}
}

module.exports = DatacensusService;