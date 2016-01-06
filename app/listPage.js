var app = angular.module("listModule",["ng", "ngRoute"]);
app.controller("listController",["$scope", "$location", "$routeParams", function($scope, $location, $routeParams) {
    $scope.data = {};
    $scope.openNum = $scope.closedNum = $scope.allNum = 0;
    $scope.resultLists = [];//显示在当前页的数据
    $scope.openLists = [];
    $scope.closeLists = [];
    $scope.allLists = [];
    $scope.pages = [];
    $scope.currentIndex = 0;
    $scope.allResultNum = 0;//符合过滤的数据的总数
    $scope.statue = $routeParams.listStatues;
    $scope.page = parseInt($routeParams.page);//具体哪页

    
    $scope.getData = function() {
        $.getJSON("data/projectData.js", function(result) {
            $scope.data = result.data;
            $scope.$digest();
        });
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
        });
    }

    $scope.clickItem = function(index) {
        $scope.currentIndex = index;
        console.log($scope.currentIndex);
    }

    $scope.showList = function() {
        var start = ($scope.page - 1) * 5;
        $scope.pages = [];
        switch ($scope.statue) {
            case "open":
                $scope.allResultNum = $scope.openLists.length;
                for(var i = 0, len = $scope.openLists.length / 5; i < len; i++) {
                    $scope.pages.push(i);
                }
<<<<<<< HEAD
                var len= $scope.openLists.length;
=======
                var len = $scope.openLists.length;
>>>>>>> 59b28ebd0799418ecf92ef3c2c31477e1fbdc2b8
                var end = (start + 5) < len ? start + 5 : len;
                $scope.resultLists = $scope.openLists.slice(start, end);
                break;
            case "closed":
                $scope.allResultNum = $scope.closeLists.length;
<<<<<<< HEAD
                for(var i = 0, len= $scope.closeLists.length / 5; i < len; i++) {
                    $scope.pages.push(i);
                }
                var len= $scope.closeLists.length;
                var end= (start + 5) < len ? start + 5 : len;
=======
                for(var i = 0, len = $scope.closeLists.length / 5; i < len; i++) {
                    $scope.pages.push(i);
                }
                var len = $scope.closeLists.length;
                var end = (start + 5) < len ? start + 5 : len;
>>>>>>> 59b28ebd0799418ecf92ef3c2c31477e1fbdc2b8
                $scope.resultLists = $scope.closeLists.slice(start, end);
                break;
            default:
                $scope.allResultNum = $scope.allLists.length;
<<<<<<< HEAD
                for(var i = 0, len= $scope.allLists.length / 5; i < len; i++) {
                    $scope.pages.push(i);
                }
                var len= $scope.allLists.length;
                var end= (start + 5) < len ? start + 5 : len;
=======
                for(var i = 0, len = $scope.allLists.length / 5; i < len; i++) {
                    $scope.pages.push(i);
                }
                var len = $scope.allLists.length;
                var end = (start + 5) < len ? start + 5 : len;
>>>>>>> 59b28ebd0799418ecf92ef3c2c31477e1fbdc2b8
                $scope.resultLists = $scope.allLists.slice(start, end);
        }

    }

    $scope.getData();
    
    $scope.$watch("data", function(newValue) {
        
        if(newValue.length) {

            $scope.getOpenIssueData();
            $scope.getClosedIssueData();
            $scope.getAllIssueData();
            $scope.showList();
        }
    })

}]);