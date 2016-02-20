module.directive("alertdialog", function() {
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
                if(!newValue && newValue!='') {
                    return;
                }
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
            scope.$watch("lists", function(newValue, oldValue) {
                if(!newValue && newValue!='') {
                    return;
                }
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