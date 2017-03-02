yogiApp.directive("dirHeader", ["$location", "$rootScope", "$interval", "$templateCache", "yogiService", "config",
    function($location, $rootScope, $interval, $templateCache, yogiService, config) {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: "app/views/viewHeader.html",
            controller: function($scope, $location, $rootScope, yogiService, config) {
                $scope.init = function() {
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
                $scope.refresh = function(){
                    $scope.init();
                    $rootScope.$broadcast("refresh");
                }

                $scope.actionSwipeRight = function(event){
                    $rootScope.$broadcast("actionSwipeRight", {event: event});
                }

                $scope.init();
            }
        }
    }
]);