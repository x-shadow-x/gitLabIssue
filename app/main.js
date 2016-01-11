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
        .when("/newIssue", {
            templateUrl: "view/newIssue.html",
            controller: "newIssueController"
        })
        .when("/editIssue/:dn", {
            templateUrl: "view/editIssue.html",
            controller: "editIssueController"
        })
        .otherwise({
            redirectTo: "/detail/2"
        })
}])