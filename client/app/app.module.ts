import { HomePageModule } from "./home-page/home-page.module";
import { AppTemplates } from "./app.templates";
import { Services } from "./services/services";
import * as angular from "angular";
angular
	.module('altranfront', [
		AppTemplates,
		HomePageModule,
		Services
	])
	.value('EventEmitter', (payload) => ({ $event: payload }));;