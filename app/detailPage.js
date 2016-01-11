var app = angular.module("detailModule", []);
app.controller('detailController', ['$scope','$location',"$routeParams", "$http","$timeout","$filter", function($scope, $location, $routeParams, $http,$timeout,$filter){
    $scope.data={};
    $scope.assigneeList = []; 
    $scope.versionList = []; 
    $scope.checked=true;
    $scope.isOpen=true;
    setTimeout(function(){console.log($scope.assigneeList)},2000);
    $scope.nid=$routeParams.dno;
    $scope.getData = function(cb) {
        console.log('issue');
        $.getJSON("data/projectData.js", function(result) {
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
    };
    $scope.$watch("text", function(v) {
        if(v && (v != "" && $scope.isOpen==true)) {
            $scope.checked=false;
        }
    });
    $scope.Open=function(){
        console.log($scope.isOpen);
        $scope.isOpen=!$scope.isOpen;
        if($scope.isOpen==false){
            $scope.checked=true;
        }else{
            $scope.checked=false;
        }

    }
    $scope.add=function(text){
        var nid=$scope.nid;
        if(text!==""){
            var tempObj = {};
            tempObj.userName = "zzzz";
            tempObj.text = text;
            tempObj.time = 1451989925924;
            $scope.data[nid].discussList.push(tempObj);
        }
    };
    $scope.toShow=function(){
        $scope.toshow=true;
    }

}])
.directive('complete',function(){
    return{
        restrict:"ECMA",
        require: 'ngModel',
        scope:{
            list:"=",
            // ngModel:'=',
            key: '@',
            placeholder: "@"
        },
        templateUrl:'view/template.html',
        link:function(scope,element,attrs, ctrl){
            scope.symbol = -1;
            scope.selectItem = function(event,element){
                var len=$(event.currentTarget).parent().find('li').length;
                console.log(len);
                var e=$(event.currentTarget).parent().find('li').eq(scope.symbol);
                console.log(e.parent().scrollTop(e.height() * scope.symbol));
                switch(event.which){
                    case 38:
                        scope.symbol = scope.symbol>0?scope.symbol-1:0; 
                        e.parent().scrollTop(e.height() * scope.symbol);
                        break;
                    case 40:
                        scope.symbol = scope.symbol>=len-1?len-1:scope.symbol+1;
                        e.parent().scrollTop(e.height() * scope.symbol);
                        break;
                    case 13:
                        scope.ngModel=scope.arr[scope.symbol];
                        console.log(scope.ngModel);
                        break;
                }
                return;
                
            };
            scope.mouseSelect = function(index){
                scope.ngModel=scope.arr[index];

            };
            scope.overSelect = function(index){
                scope.symbol = index;
            };
            scope.arr= [];
            scope.isError = false;
            scope.$watch('ngModel', function (value) {
                scope.symbol = -1;
                if(!scope.list) {
                    return;
                }
                scope.arr = scope.list.filter(function (item) {
                    var reg = new RegExp(value, 'ig');
                    return reg.test(scope.key ? item[scope.key] : item);
                });
                if(scope.arr.length ==0  && scope.symbol == -1){
                    scope.isError=true;
                }else{
                    scope.isError=false;
                }
            });
            scope.$watch("list", function(v){
                scope.symbol = -1;
                if(!v) {
                    return;
                }
                scope.arr = scope.list;
                if(scope.arr.length == 0  && scope.symbol == -1){
                    scope.isError=true;
                }else{
                    scope.isError=false;
                }
            },true);

        }
    };
});