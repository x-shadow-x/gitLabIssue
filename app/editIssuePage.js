var app=angular.module("editIssueModule", []);
app.controller('editIssueController', ['$scope','$location',"$routeParams", "$http","$timeout", function($scope, $location, $routeParams, $http,$timeout){
    $scope.data={};
    $scope.getData = function(cb) {
        $.getJSON("data/projectData.js", function(result) {
            console.log(result.data,"=============================|||||||||||||||||============================");
            $scope.data = result.data;
            cb();
            $scope.$digest();
        });
/*        $http.get("data/projectData.js").then(function(data) {
            console.log(data.data.data.pageSize);
            $scope.data = data.data.data;
            cb();
        },function(err) {
            console.log(err);
        });*/
    };
    

}]);