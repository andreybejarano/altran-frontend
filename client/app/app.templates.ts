import * as angular from "angular"; export const AppTemplates =  angular.module("app.templates", []).run(["$templateCache", function($templateCache) {$templateCache.put('home-page/home-page.html','<h1>{{$ctrl.great}} andrey</h1>');}]).name;