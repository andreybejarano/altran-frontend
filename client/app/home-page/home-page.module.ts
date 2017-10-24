import { HomePageComponent } from "./home-page.component";
import * as angular from "angular";

export const HomePageModule = angular
	.module('homePage', [])
	.component('homePage', HomePageComponent)
	.name;