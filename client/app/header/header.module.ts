import { HeaderComponent } from "./header.component";
import * as angular from "angular";

export const HeaderModule = angular
	.module('alHeader', [])
	.component('alHeader', HeaderComponent)
	.name;