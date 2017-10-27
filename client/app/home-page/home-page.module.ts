import { HomePageComponent } from "./home-page.component";
import { CardDetailsModule } from "./card-details/card-detail.module";
import * as angular from "angular";

export const HomePageModule = angular
	.module('homePage', [CardDetailsModule, 'infinite-scroll'])
	.component('homePage', HomePageComponent)
	.name;