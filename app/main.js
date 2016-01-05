angular.module("app",["ngRoute", "listModule", "detailModule"])
.config(['$routeProvider',function($routeProvider) {
    $routeProvider
        .when("/list", {
            templateUrl: "view/list.html",
            controller: "listController"
        })
        .when("/detail/:dno", {
            templateUrl: "view/detail.html",
            controller: "detailController"
        })
        .otherwise(
            redirectTo: "/view/list.html"
        )
}])