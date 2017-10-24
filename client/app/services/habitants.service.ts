export class HabitantsService {
	$http: ng.IHttpService;
	constructor($http) {
		'ngInject';
		this.$http = $http;
	}

	getHabitants() {
		return this.$http.get('http://localhost:5001/altran-front/api/datacensus/')
			.then(response => {
				return response.data;
			})
			.catch(error => {
				throw new Error(error);
			})

	}
}
