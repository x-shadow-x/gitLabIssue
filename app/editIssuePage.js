//var app=angular.module("editIssueModule", []);
app.controller('editIssueController', ['$scope','$location',"$routeParams", "$http","$timeout", function($scope, $location, $routeParams, $http,$timeout){
    $scope.data={};
    $scope.assigneeList = []; 
    $scope.versionList = []; 
    setTimeout(function(){console.log($scope.assigneeList)},2000);
    $scope.getData = function(cb) {
        console.log('edit');
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
    $scope.getData(function(){
        $scope.getassignee();
        $scope.getversion();
    });
    $scope.getassignee=function(){
        var n={};
        var l=$scope.data.length;
        for(var i=0;i<l;i++){
            var assignee=$scope.data[i].assignee;
            if(!n[assignee]){
                n[assignee]=true;
                $scope.assigneeList.push(assignee);
            }
        }
    }
    $scope.getversion=function(){
        var n={};
        var l=$scope.data.length;
        for(var i=0;i<l;i++){
            var version=$scope.data[i].version;
            if(!n[version]){
                n[version]=true;
                $scope.versionList.push(version);
            }
        }
    }
    $scope.submit=function(){
        var valT=$scope.title;
     
    }

}]);