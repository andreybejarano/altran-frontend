'use strict';
const config = require('../../config');
const request = require('request-promise');

class DatacensusService {
	/**
	 * Get data census
	 * @description This method gat data of API and return promise with data census
	 * @return {Promise} Resolve data census or reject error
	 */
	getDatacensus() {
		const options = {
			method: 'GET',
			uri: `${config.endpoints.censusList}`,
			json: true
		};
		return new Promise((resolve, reject) => {
			request(options)
				.then(data => {
					resolve(data.Brastlewark);
				})
				.catch(error => {
					reject(new Error(error));
				});
		});
	}
}

module.exports = DatacensusService;