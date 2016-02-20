module.directive("myPages", function(Data, $timeout) {
    return {//增加git测试注释
        scope: {
            pageSize: "@", //每页最多显示多少条数目
            showNum: "@", //当前页的前后显示多少页
            data: "=", //接收到的数据
            listData: "=",
            index: "=currentPage",
            sortrequest: "=",
            assignee: "=",
            author: "="
        },
        templateUrl: "view/myPages.html",
        link: function(scope, elem, attrs) {

            scope.hasMore = scope.hasRest = false;

            /**
             * [总页数]
             * @type {Number}
             */
            scope.maxPage = 0;

            /**
             * [当前选中页]
             * @type {Number}
             */
            scope.index = 1;

            /**
             * [初始化分页插件的显示，初始显示5页，若总页数超过5页则显示前向省略号]
             * @param  {[type]} v [description]
             * @return {[type]}   [description]
             */
            var initPages = function(v) {
                if (v) {
                    scope.index = 1;
                    scope.showNum = parseInt(scope.showNum);
                    scope.maxPage = Math.ceil(parseInt(v.data.data.total) / parseInt(scope.pageSize));
                    //console.log(scope.showNum + 1);
                    //console.log((scope.showNum + 1) <= scope.maxPage);
                    var len = (scope.showNum) + 1 <= scope.maxPage ? scope.showNum + 1 : scope.maxPage
                    scope.pages = [];
                    console.log(len);
                    for (var i = 0; i < len; i++) {
                        scope.pages.push(i + 1);
                    }
                    if (scope.index + parseInt(scope.showNum) < scope.maxPage) { //当前页往后显示showNum后依然没有到达最大页面~故要显示省略号
                        scope.hasMore = true;
                    }else {
                        scope.hasMore = false;
                    }
                    if (scope.index - parseInt(scope.showNum) > 1) {
                        scope.hasRest = true;
                    }else {
                        scope.hasRest = false;
                    }
                }
            }

            var updatePages = function(first, last) {
                var arr = [];
                var len = last - first + 1;
                for (var i = 0; i < len; i++) {
                    arr.push(i + first);
                }
                scope.pages = arr;
            }

            scope.clickPage = function(index) {

                var range = parseInt(scope.showNum);
                var start = scope.pages[0]; //目前第一页页码
                var end = scope.pages[scope.pages.length - 1]; //目前最后一页页码
                var first = 0; //将要更新的页码的第一页
                var last = 0; //将要更新的页码的最后一页
                var arr = [];
                
                if(index == scope.index) {
                    return;
                }
                console.log('前：', scope.pages);
                console.log(index,scope.index,end,scope.maxPage);
                if(index > scope.index && end < scope.maxPage && index > 2) {
                    for(var i = 0, len = scope.pages.length; i < len; i++) {
                        scope.pages[i] = scope.pages[i] + 1;
                    }
                }
                if(index < scope.index && start > 1 && index < scope.maxPage - 1) {
                    
                    for(var i = 0, len = scope.pages.length; i < len; i++) {
                        scope.pages[i] = scope.pages[i] - 1;
                    }
                }
                
                console.log('后：', scope.pages);
                if(index > scope.index && index > 2 && scope.pages[0] != 1) {
                    scope.hasRest = true;
                }else if(index < scope.index && scope.pages[0] >= 2) {
                    scope.hasRest = true;
                }
                else {
                    scope.hasRest = false;
                }
                
                console.log(scope.pages[scope.pages.length - 1]);
                if( index > scope.index && scope.pages[scope.pages.length - 1] != scope.maxPage) {
                    scope.hasMore = true;
                }else if(index < scope.index && index < scope.maxPage - 1) {
                    scope.hasMore = true;
                }else {
                    scope.hasMore = false;
                }
                
                var requireStr = "http://localhost:7999/issue?pageNum=" + index;
                scope.index = index;
                var parameter = {};
                if(scope.assignee) {
                    parameter.assignee = scope.assignee;
                }
                if(scope.author) {
                    parameter.author = scope.author;
                }
                if(scope.sortrequest) {
                    parameter.sortrequest = scope.sortrequest;
                }
                for(var key in parameter) {
                    requireStr = requireStr + '&' + key + '=' + parameter[key].toLowerCase().replace(/ /g,'_');
                }
                console.log(requireStr);
                var requireStr = "http://localhost:7999/issue?pageNum=" + index;
                Data.getData(requireStr, function(data) {
                    scope.listData = data.data.data.data;
                });
            }

            scope.$watch('data', function(v) {
                initPages(v);
                scope.data = null;
            }, true);
        }
    }
});