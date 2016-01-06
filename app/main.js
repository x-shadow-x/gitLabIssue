angular.module("app",["ngRoute", "listModule", "detailModule"])
.config(['$routeProvider',function($routeProvider) {
    $routeProvider
        .when("/list/:listStatues", {
            templateUrl: "view/list.html",
            controller: "listController"
        })
        .when("/detail/:dno", {
            templateUrl: "view/detail.html",
            controller: "detailController"
        })
        .otherwise({
            redirectTo: "/list/open"
        })
}])