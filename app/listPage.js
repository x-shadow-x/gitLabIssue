var app = angular.module("listModule",["ng", "ngRoute"]);
app.controller("listController",["$scope", "$location", "$routeParams", function($scope, $location, $routeParams) {
    $scope.data = {};
    $scope.openNum = $scope.closedNum = $scope.allNum = 0;
    $scope.resultLists = [];
    $scope.openLists = [];
    $scope.closeLists = [];
    $scope.allLists = [];
    $scope.statue = $routeParams.listStatues;
    $scope.getData = function() {
        $.getJSON("data/projectData.js", function(result) {
            $scope.data = result.data;
        });
        //console.log($scope.data);
    }
    $scope.getOpenIssueData = function() {
        for(var i = 0, len = $scope.data.length; i < len; i++) {
            if($scope.data[i].statue == "Open") {
                $scope.openLists.push($scope.data[i]);
                $scope.openNum++;
            }
        }
    }
    $scope.getClosedIssueData = function() {
        for(var i = 0, len = $scope.data.length; i < len; i++) {
            if($scope.data[i].statue == "Closed") {
                $scope.closeLists.push($scope.data[i]);
                $scope.closedNum++;
            }
        }
    }
    $scope.getAllIssueData = function() {
        $scope.allLists = $scope.data;
        $scope.allNum = $scope.data.length;
    }

    $scope.toggleMarkAll = function() {
        angular.forEach($scope.resultLists, function(item) {
            item.isMark = $scope.markAll;
        })
    }

    $scope.showList = function() {
        switch ($scope.statue) {
            case "open":
                $scope.resultLists = $scope.openLists;
                break;
            case "closed":
                $scope.resultLists = $scope.closeLists;
                break;
            default:
                $scope.resultLists = $scope.allLists;
        }
    }

    $scope.getData();
    //console.log($scope.data);
    $scope.$watch("data", function(newValue) {
        //console.log(newValue.length);
        if(newValue.length) {
            $scope.getOpenIssueData();
            $scope.getClosedIssueData();
            $scope.getAllIssueData();
            $scope.showList();
        }
    })

//     $timeout(function(){
//         // getOpenNum();
//         // getClosedNum();
//         console.log($scope.data);
// },2000);


}]);
app.directive("list", function() {
    return {
        link: function(scope, elem, attrs) {

        }
    }
})