angular.module("detailModule", []);
app.controller('detailController', ['$scope','$location',"$routeParams", "$http","$timeout", function($scope, $location, $routeParams, $http,$timeout){
    $scope.data={};
    $scope.assigneeList = []; 
    $scope.versionList = []; 
    $scope.checked=true;
    // $scope.toshow=true;
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
    $scope.$watch("text", function(v) {
        if(v && (v != "" && !$scope.isOpen)) {
          /*  console.log($scope.isOpen);*/
            $scope.checked=false;
        }
    })
    $scope.add=function(text){
        if(text!==""){
            $scope.isOK = "";
            var tempObj = {};
            tempObj.userassignee = "zzzz";
            tempObj.text = text;
            tempObj.time = 1451989925924;
            $scope.data[1].discussList.push(tempObj);
        }
    };
    $scope.toShow=function(){
        $scope.toshow=true;
    }
/*    $scope.isOpen=function(){
        $scope.isOpen=!$scope.isOpen;

    }*/
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
            scope.isShown = true;
            scope.symbol = -1;
            scope.selectItem = function(event,element){
                var e=$(event.currentTarget).parent().find('li').eq(scope.symbol);
                switch(event.which){
                    case 38:
                        scope.symbol = scope.symbol>0?scope.symbol-1:0; 
                        console.log(e.position().top);
                        e.parent().scrollTop(e.height() * scope.symbol);
                        console.log(scope.symbol);
                        break;
                    case 40:
                        scope.symbol = scope.symbol+1;
                        e.parent().scrollTop(e.height() * scope.symbol);
                        console.log(e.position().top);
                        break;
                    case 13:
                        scope.ngModel=scope.arr[scope.symbol].assignee;
                        console.log(scope.ngModel);
                        break;
                }
                return;
                
            };
            scope.mouseSelect = function(index){
                scope.ngModel=scope.arr[index].assignee;

            };
            scope.overSelect = function(index){
                scope.symbol = index;
            };
            scope.arr= [];
            scope.isError = false;
            scope.$watch('ngModel', function (value) {
                scope.symbol = -1;
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

        }
    };
});







































