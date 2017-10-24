module.exports = function (config) {
	config.set({
		basePath: '',
		files: [
			'build/*.js',
			'client/tests/**/*test.js'
		],
		frameworks: ['jasmine'],
		browsers: ['Chrome', 'Firefox'],
		autoWatch: false,
		singleRun: false,
		plugins: [
			'karma-chrome-launcher',
			'karma-firefox-launcher',
			'karma-jasmine'
		]
	});
};