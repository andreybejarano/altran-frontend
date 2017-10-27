import { CardDetailsComponent } from "./card-detail.component";
import * as angular from "angular";

export const CardDetailsModule = angular
	.module('alCardDetails', [])
	.component('alCardDetails', CardDetailsComponent)
	.name;