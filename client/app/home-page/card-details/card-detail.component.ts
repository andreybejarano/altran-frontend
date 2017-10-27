export const CardDetailsComponent = {
	templateUrl: 'home-page/card-details/card-detail.html',
	bindings: {
		habitants: '<'
	},
	controller: class CardDetailsComponent {
		private $scope: ng.IScope;
		private EventEmitter: ng.IAngularEvent;
		private habitants: Array<any> = [];
		private numberToDisplay: number;
		constructor($scope, EventEmitter) {
			'ngInject';
			this.$scope = $scope;
			this.EventEmitter = EventEmitter;
			this.numberToDisplay = 8;
		}

		$onInit() {
		}

		loadMore() {
			if (this.habitants) {
				if (this.numberToDisplay + 4 < this.habitants.length) {
					this.numberToDisplay += 4;
				} else {
					this.numberToDisplay = this.habitants.length;
				}
			}
		};
	}
};
