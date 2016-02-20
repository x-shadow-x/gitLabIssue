module.directive("timer", function() {
        return {
            scope: {
                oldtime: "@"
            },
            template:"<span>{{distime}}</span>",
            link: function(scope, elem, attrs) {
                //console.log("===========================" + scope.oldtime);
                var date1 = new Date(parseInt(scope.oldtime));
                var date2 = new Date();
                var disYear = date2.getFullYear() - date1.getFullYear();
                var disMonth = date2.getMonth() - date1.getMonth();
                var disDate = date2.getDate() - date1.getDate();
                var disHour = date2.getHours() - date1.getHours();
                scope.distime = "";
                if (disYear != 0) {
                    scope.distime = "about " + disYear + " Years";
                    //console.log("about " + disYear + " Years");
                } else if (disMonth != 0) {
                    scope.distime = "about " + disMonth + " Months";
                    console.log("about " + disMonth + " Months");
                } else if (disDate != 0) {
                    scope.distime = "about " + disDate + " Days";
                    //console.log("about " + disDate + " Days");
                } else if (disHour != 0) {
                    scope.distime = "about " + disHour + " Hours";
                    //console.log("about " + disHour + " Hours");
                } else {
                    scope.distime = date2.getMonth() + " " + date2.getDate() + " " + date2.getFullYear();
                    //console.log(date2.getMonth() + " " + date2.getDate() + " " + date2.getFullYear());
                }
            }
        }
    })
    .directive('toggleClass', function(){
        return {
            restrict: 'A',
            scope: {
                toggleClass: '@'
            },
            link: function(scope, element){
                element.on('mousedown', function(){
                    element.toggleClass(scope.toggleClass);
                });
            }
        };
    });
