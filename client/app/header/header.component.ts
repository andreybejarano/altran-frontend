export const HeaderComponent = {
	templateUrl: 'header/header.html',
	controller: class HeaderComponent {
		$scope: ng.IScope;

		constructor($scope) {
			'ngInject';
			this.$scope = $scope;
		}

		$onInit() {
			
		}

	}
};
