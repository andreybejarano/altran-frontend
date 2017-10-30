import { HabitantsService } from "../services/services";
export const HomePageComponent = {
	templateUrl: 'home-page/home-page.html',
	controller: class HomePageComponent {
		private $scope: ng.IScope;
		private HabitantsService: HabitantsService;
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
				.then((data:any) => {
					this.habitants = data;
				})
				.catch(error => this.habitants = {});	
		}

	}
};
