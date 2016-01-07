var app = angular.module("listModule",["ng", "ngRoute"]);
app.controller("listController",["$scope", "$location", "$routeParams", "$http","$timeout", function($scope, $location, $routeParams, $http,$timeout) {
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


//=============================================提示框
    $scope.authorList = [];
    $scope.assigneeList = [];
    $scope.toShow = false;

    
    $scope.getData = function(cb) {
        // $.getJSON("data/projectData.js", function(result) {
        //     console.log(result.data,"=============================|||||||||||||||||============================");
        //     $scope.data = result.data;
        //     cb()
        //     $scope.$digest();
        // });
        
        $http.get("data/projectData.js").then(function(data) {
            $scope.data = data.data.data;
            cb();
        },function(err) {
            console.log(err);
        });
    }
    $scope.getAuthor = function() {
        var n = {}; //n为hash表
        for(var i = 0, len = $scope.data.length; i < len; i++) {
            var author = $scope.data[i].author;
            if (!n[author]) {
                n[author] = true; //存入hash表
                $scope.authorList.push(author); //把当前数组的当前项push到临时数组里面
            }
        }
    }
    $scope.getAssignee = function() {
        var n = {}; //n为hash表
        for(var i = 0, len = $scope.data.length; i < len; i++) {
            var assignee = $scope.data[i].assignee;
            if (!n[assignee]) {
                n[assignee] = true; //存入hash表
                $scope.assigneeList.push(assignee); //把当前数组的当前项push到临时数组里面
            }
        }
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
                var len = $scope.openLists.length;
                var end = (start + 5) < len ? start + 5 : len;
                $scope.resultLists = $scope.openLists.slice(start, end);
                break;
            case "closed":
                $scope.allResultNum = $scope.closeLists.length;
                for(var i = 0, len = $scope.closeLists.length / 5; i < len; i++) {
                    $scope.pages.push(i);
                }
                var len = $scope.closeLists.length;
                var end = (start + 5) < len ? start + 5 : len;
                $scope.resultLists = $scope.closeLists.slice(start, end);
                break;
            default:
                $scope.allResultNum = $scope.allLists.length;
                for(var i = 0, len = $scope.allLists.length / 5; i < len; i++) {
                    $scope.pages.push(i);
                }
                var len = $scope.allLists.length;
                var end = (start + 5) < len ? start + 5 : len;
                $scope.resultLists = $scope.allLists.slice(start, end);
        }

    }
    $scope.filterData = function() {
        var arr = [];
        angular.forEach($scope.resultLists, function(item) {
            console.log(item);
        });

    }

    $scope.getData(function(){
        $scope.getOpenIssueData();
        $scope.getClosedIssueData();
        $scope.getAllIssueData();
        $scope.showList();
        $scope.getAuthor();
        $scope.getAssignee();
    });

    $scope.$watch("keyWord1", function(v) {
        $scope.filterData();
    });

}]);

app.directive("alertdialog", function($timeout) {
    return {

        require: "?ngModel",
        replace: true,
        scope: {
            lists: "=",
            keyWord: "=ngModel",
            key: "@",
            placeholder: "@"
        },
        templateUrl: "view/templatedialog.html",

        link: function(scope, elem, attrs, ctrl) {
            if(scope.lists.length == 0) {

            }
            
            var isFirst = true;

            var keys = scope.key ? scope.key.split(".") : null;

            scope.results = []; //存放过滤后的结果
            scope.index = -1;
            
            scope.getValue = function() {
                if(!keys.length) {
                    return;
                }
                var newArr = [];
                for(var i = 0, len = scope.results.length; i < len; i++) {
                    var value = scope.results[i][keys[0]];
                    for(var j = 1, keyLen = keys.length; j < keyLen; j++) {
                        value = value[keys[j]];
                    }
                    newArr.push(value);
                }
                scope.lists = newArr;
                scope.results = newArr;
                var item = scope.results[0];
                var value = scope.results[keys[0]];
                var value = item[keys[0]];
                scope.key = null;
               
            }
            scope.show = function() {
                if(isFirst && keys) {
                    scope.getValue();
                    isFirst = false;
                }
                if(attrs.up == "") {
                    var height = $("body").scrollTop() == 0 ? $(window).height() - (elem.offset().top - $("body").scrollTop()) : (elem.offset().top - $("body").scrollTop());
                    elem.find("ul").css("maxHeight", height + "px");
                }else {
                    var height = $(window).height() - (elem.offset().top + elem.height() + 40);
                    height = height > 320 ? 320 : height;
                    elem.find("ul").css("maxHeight", height + "px");
                }
                
                scope.isShow=true;
            }
            
            scope.up = function() {
                
                var e = elem.find("ul");
                var height = e.height();
                var original = elem.offset();
                elem.css("position", "relative");
                e.css({
                    "position": "absolute",
                    "zIndex": "1000",
                    "bottom": "120%"
                });
                
            }
            scope.down = function() {
                
                var e = elem.find("ul");
                var height = e.height();
                var original = elem.offset();
                elem.css("position", "relative");
                e.css({
                    "position": "absolute",
                    "zIndex": "1000",
                    "top": "120%"
                });
            
            }

            scope.keyUp = function() {

                if (event.keyCode == 13) {
                    if (scope.index != -1) { //用户输入了词语但是和只和列表部分匹配此时按下回车键不应做相应操作
                      scope.isEnter = true;
                      scope.isShow = false;
                      scope.keyWord = scope.key ? scope.results[scope.index][scope.key] : scope.results[scope.index];
                  }
                } else if (event.keyCode == 38) {
                    if (scope.results.length > 0) { //不加这个判断当noMatch时按上下键设置滚动条时会报错
                        scope.index = scope.index > 0 ? --scope.index : scope.index == -1 ? scope.results.length - 1 : 0;
                        var currentElem = angular.element(elem.find("li")[scope.index]);
                        currentElem.parent().scrollTop(currentElem.height() * scope.index);
                    }
                } else if (event.keyCode == 40) {
                    if (scope.results.length > 0) {
                        scope.index = scope.index < scope.results.length - 1 ? ++scope.index : scope.index;
                        var currentElem = angular.element(elem.find("li")[scope.index]);
                        currentElem.parent().scrollTop(currentElem.height() * scope.index);
                    }
                }
            }
            scope.clickItem = function(index) {
                scope.keyWord = scope.key ? scope.results[index][scope.key] : scope.results[index];
            }
            scope.$watch("keyWord", function(newValue, oldValue) {
                if(attrs.up == "") {
                    scope.up();
                }else {
                    scope.down();
                }
                scope.index = -1;
                var e = new RegExp(newValue, 'ig');
                scope.results = scope.lists.filter(function(item) {
                    return e.test(scope.key ? item[scope.key] : item);
                });
                
                if (scope.results.length == 0) {
                    scope.isNoMatch = true;
                } else {
                    scope.isNoMatch = false;
                }
                if (oldValue != newValue) { //----------------------------------1
                    if (!scope.isEnter) { //--------------------------------------2
                        scope.isShow = true;
                    } else {
                        scope.isEnter = false; //-----------------------------------3
                    }
                }
            });
            $timeout(function () {
                //console.log(scope.lists);
            }, 5000);
            scope.$watch("lists", function(newValue, oldValue) {
                if(attrs.up == "") {
                    scope.up();
                }else {
                    scope.down();
                }
                
                scope.index = -1;
                var e = new RegExp(scope.keyWord, 'ig');
                scope.results = scope.lists.filter(function(item) {
                    return e.test(scope.key ? item[scope.key] : item);
                });
                
                if (scope.results.length == 0) {
                    scope.isNoMatch = true;
                } else {
                    scope.isNoMatch = false;
                }
                
            },true);
        }
    }
});