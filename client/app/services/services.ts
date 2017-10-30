import { HabitantsService } from "./habitants.service";
import * as angular from "angular";

export const Services =
	angular.module('services', [])
		.service('HabitantsService', HabitantsService)
		.name;

export { HabitantsService };
