var module = angular.module("app",["ngRoute", "listModule", "directiveModule"]);
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
        .when("/editIssue/:dn", {//增加这行注释仅仅是用来测试修改文件时git提交的状态
            templateUrl: "view/editIssue.html",
            controller: "editIssueController"
        })
        .otherwise({
            redirectTo: "/list/open/1"
        })
}])