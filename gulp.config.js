'use strict';

module.exports = () => {
	const pkg = require('./package.json');
	const root = './';
	const server = './server/';
	const client = './client/';
	const views = `${server}app/views/`;
	const scssfolder = `${client}scss/`;
	const mainscss = `${scssfolder}main.scss`;
	const build = './build/';
	const appFolder = `${client}app/`;
	const tmp = './.tmp/';
	const config = {
		projectName: pkg.name,
		version: pkg.version,
		appFolder,
		app: `${appFolder}app.module.ts`,
		scssfolder,
		root,
		mainscss,
		build,
		server,
		views,
		images: `${client}images/`,
		fonts: `${scssfolder}fonts/`,
		vendorfolder: `${client}vendor/`,
		jsOrder: ['**/app.module.js', '**/*.module.js', '**/*.js'],
		files: {
			sass: [`${client}**/*.scss`],
			js: [`${client}**/*.js`, `!${client}**/*.templates.js`],
			html: `${client}**/*.html`,
			pug: `${client}**/*.pug`,
			json: `${client}**/*.json`,
			ts: `${client}**/*.ts`

		},
		templateCache: {
			file: 'app.templates.ts',
			options: {
				standalone: true,
				module: 'app.templates',
				templateHeader: 'import * as angular from "angular"; export const AppTemplates = ' +
				' angular.module("<%= module %>"<%= standalone %>)' +
				'.run(["$templateCache", function($templateCache) {',
				templateFooter: '}]).name;'
			}
		},
		tmp
	};

	return config;
};