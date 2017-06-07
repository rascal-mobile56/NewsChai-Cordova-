var yogiApp = angular.module("yogiApp", [
    'ngRoute',
    'ngCordova',
    'ngCordova.plugins.socialSharing',
    'angular-flexslider',
    'fsm',
    'ngProgress',
    'ngTouch',
    'swipe',
    'ngSanitize',
    'slickCarousel',
    'dotdotdot-angular'
]);

yogiApp.config(['$routeProvider', '$httpProvider','$locationProvider',
    function($routeProvider, $httpProvider,$locationProvider) {
        $routeProvider.
        when('/home', {
            templateUrl: 'app/views/viewHome.html',
            controller: 'ctrlHome',
            resolve: {
                homeData: function ($q, yogiService, config) {
                    function renderLocalData() {
                        var localdata;
                        yogiService.getLocalData(moduleName)
                            .then(function (data) {
                                localdata = data;
                                if(localdata) {
                                    deferred.resolve(localdata);
                                } else {
                                    getHomepagedata();
                                }
                            });
                    }

                    function getHomepagedata() {
                        var url = config.RESTURLS.HOST.BASE + config.RESTURLS.SUBURL.HOME;
                        yogiService.getData(url, "", "", function(response){
                            deferred.resolve(response);
                        }, function(){
                            deferred.resolve(null);
                        });
                    }

                    var deferred = $q.defer()
                    var moduleName = 'home';
                    yogiService.setCurrentModule(moduleName);
                    yogiService.setSelectedCategory('BREAKING');
                    if (Date.now() < yogiService.getTimeExpired(moduleName)){
                        renderLocalData();
                    } else {
                        getHomepagedata();
                    }
                    return deferred.promise;
                }
            }
        }).
        when('/category/:catName', {
            templateUrl: 'app/views/viewCategory.html',
            controller: 'ctrlCategory',
            resolve: {
                categoryData: function($q, $routeParams, $route, yogiService, config) {
                    function renderLocalData() {
                        var localdata;
                        if(yogiService.getSelectedCategoryData()){
                            deferred.resolve(yogiService.getSelectedCategoryData());
                        } else {
                            yogiService.getLocalData($route.current.params.catName)
                                .then(function (data) {
                                    localdata = data;
                                    if(localdata) {
                                        deferred.resolve(localdata);
                                    } else {
                                        getHomepagedata();
                                    }
                                });
                        }
                    }

                    function getHomepagedata() {
                        var url = config.RESTURLS.HOST.BASE + '/' + yogiService.getSelectedCategory().toLowerCase() + ".json";
                        yogiService.getData(url, "", "", function(response){
                            deferred.resolve(response);
                        }, function(){
                            deferred.resolve(null);
                        });
                    }

                    var deferred = $q.defer();
                    var moduleName = 'category';
                    yogiService.setCurrentModule(moduleName);
                    yogiService.setSelectedCategory($route.current.params.catName);
                    if (Date.now() < yogiService.getTimeExpired($route.current.params.catName)){
                        renderLocalData();
                    } else {
                        getHomepagedata();
                    }
                    return deferred.promise;
                }
            }
        }).
        when('/category/:catName/news/:newsTitle', {
            templateUrl: 'app/views/viewDetail.html',
            controller: 'ctrlDetail',
            resolve: {
                feed: function(yogiService) {
                    var detailsData = yogiService.getCurrentData();
                    console.info(detailsData);
                    return detailsData;
                }
            }
        }).
        when('/tutorial', {
            templateUrl: 'app/views/viewTutorial.html',
            controller: 'ctrlTutorial',
            resolve: {
                homeData: function ($q, yogiService, config) {
                    function renderLocalData() {
                        var localdata;
                        yogiService.getLocalData(moduleName)
                            .then(function (data) {
                                localdata = data;
                                if(localdata) {
                                    deferred.resolve(localdata);
                                } else {
                                    getHomepagedata();
                                }
                            });
                    }

                    function getHomepagedata() {
                        var url = config.RESTURLS.HOST.BASE + config.RESTURLS.SUBURL.HOME;
                        yogiService.getData(url, "", "", function(response){
                            deferred.resolve(response);
                        }, function(){
                            deferred.resolve(null);
                        });
                    }

                    var deferred = $q.defer()
                    var moduleName = 'home';
                    yogiService.setCurrentModule(moduleName);
                    yogiService.setSelectedCategory('BREAKING');
                    if (Date.now() < yogiService.getTimeExpired(moduleName)){
                        renderLocalData();
                    } else {
                        getHomepagedata();
                    }
                    return deferred.promise;
                }
            }
        }).
        otherwise({
            redirectTo: '/tutorial'
        });
        // otherwise({
        //    redirectTo: '/home'
        // });
        
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }

]);

angular.module('exceptionOverride', []).factory('$exceptionHandler', function() {
  return function(exception, cause) {
    exception.message += ' (caused by "' + cause + '")';
    alert(exception.message);
    throw exception;
  };
});