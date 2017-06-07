yogiApp.directive("dirHeader", ["$location", "$rootScope", "$interval", "$templateCache", "yogiService", "config",
    function($location, $rootScope, $interval, $templateCache, yogiService, config) {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: "app/views/viewHeader.html",
            controller: function($scope, $location, $rootScope, yogiService, config) {

                $rootScope.menu;

                $scope.toggleTextMode = function(mode){
                    if(mode){
                        $("#show_images_home").css({color: '#000', 'background-color': 'rgb(220, 219, 221)', 'border-color': '#ddd'});
                        $("#hide_images_home").css({color: '#fff', 'background-color': '#286090', 'border-color': '#204d74'});
                    } else {
                        $("#show_images_home").css({color: '#fff', 'background-color': '#286090', 'border-color': '#204d74'});
                        $("#hide_images_home").css({color: '#000', 'background-color': 'rgb(220, 219, 221)', 'border-color': '#ddd'});
                        
                    }
                    $rootScope.isTextOnly = mode;
                    yogiService.setViewMode($rootScope.isTextOnly);
                }

                $scope.init = function() {


                    $("#show_images_home").css({color: '#fff', 'background-color': '#286090', 'border-color': '#204d74'});
                    $("#hide_images_home").css({color: '#000', 'background-color': 'rgb(220, 219, 221)', 'border-color': '#ddd'});
                    $rootScope.menu = $('.left-menu').sliiide({place: 'left', exit_selector: '.left-exit', toggle: '#nav-icon2'});

                    $scope.headerData = [];
                    $scope.moreCategories = [];
                    $scope.getHeaderData();
                };



                $scope.getHeaderData = function() {
                    var url = config.RESTURLS.HOST.BASE + config.RESTURLS.SUBURL['MENU'];
                    yogiService.getData(url, "", "", $scope.successHeaderData, $scope.failureHeaderData,true);
                };
                $scope.successHeaderData = function(result, status, headers, config) {
                    $scope.headerData = result.data;
                    yogiService.setMenuData(result.data);
                    $scope.moreCategories = angular.isDefined(result.moreCategories) ? result.moreCategories : [];
                    $scope.showMoreCategories = $scope.moreCategories.length > 0 ? true : false
                    $scope.processHeaderClasses();
                };
                $scope.failureHeaderData = function(result, status, headers, config) {
                    $scope.headerData = [];
                    $scope.moreCategories = [];
                };
                $scope.processHeaderClasses = function() {
                    angular.forEach($scope.headerData, function(entry, index) {
                        entry.idName = config.idNames[entry.catCode]
                    });
                    angular.forEach($scope.moreCategories, function(entry, index) {
                        entry.idName = config.idNames[entry.catCode]
                    });
                };

                $scope.selectCategory = function(data) {

                    //$rootScope.menu.deactivate();

                    if(typeof window.spinnerplugin !== 'undefined'){
                        window.spinnerplugin.show();
                    }
                    $interval.cancel($rootScope.serviceTimer);
                    yogiService.setSelectedCategoryTitle(data.displayName);
                    //$templateCache.removeAll();
                    setTimeout(function(){
                        $location.url("/category/" + data.catCode.toLowerCase());
                    }, 0);
                    //$rootScope.$broadcast("changeroute", data.catCode.toLowerCase());
                    //$(".navbar-toggle").trigger('click');
                };
                $scope.goHome = function() {
                    $rootScope.menu.activate();
                    $rootScope.menu.deactivate();
                    $location.url('/home');
                };

                $scope.refresh = function(){
                    $scope.init();
                    $rootScope.$broadcast("refresh");
                };

                $scope.actionSwipeRight = function(event){
                    $rootScope.$broadcast("actionSwipeRight", {event: event});
                }

                $scope.init();
            }
        }
    }
]);