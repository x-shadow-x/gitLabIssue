var module = angular.module("app",["ngRoute", "listModule", "detailModule", "directiveModule", "newIssueModule"]);
module.config(['$routeProvider',function($routeProvider) {
    $routeProvider
        .when("/list/:listStatues/:page", {
            templateUrl: "view/list.html",
            controller: "listController"
        })
        .when("/detail/:dno", {
            templateUrl: "view/detail.html",
            controller: "detailController"
        })
        .when("/newIssue", {
            templateUrl: "view/newIssue.html",
            controller: "newIssueController"
        })
        .otherwise({
            redirectTo: "/list/open/1"
        })
}])