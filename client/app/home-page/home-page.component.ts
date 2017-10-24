import { HabitantsService } from "../services/habitants.service";
export const HomePageComponent = {
	templateUrl: 'home-page/home-page.html',
	controller: class HomePageComponent {
		$scope: ng.IScope;
		great: String;
		HabitantsService: HabitantsService;
		constructor($scope, HabitantsService) {
			'ngInject';
			this.$scope = $scope;
			this.great = 'Hola por fin ';
			this.HabitantsService = HabitantsService;
		}

		$onInit() {
			this.HabitantsService.getHabitants()
				.then(data => {
					console.log(data)
				})
		}

	}
};
