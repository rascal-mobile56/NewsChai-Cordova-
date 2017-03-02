yogiApp.controller('ctrlMain', ["$scope", "$location", "$rootScope", "$routeParams", "yogiService", "config","$timeout",'$templateCache','ngProgress',
    function($scope, $location, $rootScope, $routeParams, yogiService, config, $timeout,$templateCache, ngProgress) {

        $scope.moduleName = 'home';
        $scope.init = function() {            
            $scope.isMainScreen = true;
            $scope.checkMainScreen();
            $scope.initWatchers();
            $scope.breakingNews = [];
        };

        $scope.checkMainScreen = function() {
            var currLocation = $location.url();
            if (currLocation.indexOf("home") > -1) {
                $scope.isMainScreen = true;
            } else {
                $scope.isMainScreen = false;
            }
        };
        $scope.changeRoute = function(routeName) {
            /*$templateCache.removeAll();
            $location.url("/category/" + routeName);*/
        };
        $scope.openDetailsPage = function(data) {
            //$templateCache.removeAll();
            var slug = data.title.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
            $location.url("/category/" + data.category + "/news/" + slug);
        };
        $scope.selectNews = function(data) {
            // yogiService.setCurrentData(data);
            $scope.openDetailsPage(data);

            // $rootScope.$broadcast("openDetails",data)
        };

        $scope.initWatchers = function() {
            $rootScope.$on("$routeChangeSuccess", function(signal, data) {
                if($(".navbar-collapse").is(":visible"))  $('.navbar-collapse').collapse('hide');
                $scope.checkMainScreen();
            });
            $rootScope.$on("changeroute", function(signal, data) {
                $scope.changeRoute(data);
            });
            $rootScope.$on("openDetails", function(signal, data) {
                $scope.openDetailsPage(data);
            });
            $rootScope.$on("resetRoute", function(signal, data) {
                $location.path("/home");
            });
            $rootScope.$on("breakingNews", function(signal, data) {
                $scope.slickConfigLoaded = false;
                $scope.breakingNews = data;
                $timeout(function() { 
                    $scope.breakingNewsThumb = data;
                    $scope.slickConfigLoaded = true;
                },1000);
                

            });
        };

        $rootScope.$on("refresh", function() {
            if(yogiService.getCurrentModule() == $scope.moduleName ){
                // $scope.breakingNews = [];
                $scope.slickConfigLoaded = false;

            }
        });


        $scope.init();
    }
]);