import { HabitantsService } from "../services/habitants.service";
export const HomePageComponent = {
	templateUrl: 'home-page/home-page.html',
	controller: class HomePageComponent {
		$scope: ng.IScope;
		HabitantsService: HabitantsService;
		private habitants: Object;
		constructor($scope, HabitantsService) {
			'ngInject';
			this.$scope = $scope;
			this.HabitantsService = HabitantsService;
		}

		$onInit() {
			this.setHabitants();
		}

		setHabitants() {
			this.HabitantsService.getHabitants()
				.then(data => {
					this.habitants = data;
				})
				.catch(error => this.habitants = {});	
		}

	}
};
