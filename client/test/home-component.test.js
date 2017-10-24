'use strict';

describe('Modulo app.cars', () => {

	beforeEach(() => {
		module('altranfront');
	});

	describe('home', () => {

		beforeEach(() => {
			inject(['homePage', (moduler) => {
				const modules = moduler;
			}
			]);
		});

		it('debe devolversaludo', () => {
			let great = modules.getAll();
			expect(great).toBeDefined();
			expect(cars.length).toBe(2);
		});
	});
});