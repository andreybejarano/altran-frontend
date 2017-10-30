'use strict';
describe('Services', function () {

	beforeEach(function () {
		module('services');
	});

	describe('Habitants service', function () {
		var modules;
		beforeEach(function () {
			inject(['HabitantsService', function(moduler) {
				modules = moduler;
			}
			]);
		});

		it('debe devolver Habitantes', function () {
			modules.getHabitants()
				.then((data) => {
					expect(typeof data).toBe('object');
				})
				.catch(error => {
					throw error;
				})
		});

	});

});