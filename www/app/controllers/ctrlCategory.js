yogiApp.controller('ctrlCategory', ["$scope", "$location", "$rootScope", "yogiService", "config", '$interval', '$routeParams', '$window', 'ngProgress', '$timeout', '$route', 'categoryData',
    function($scope, $location, $rootScope, yogiService, config, $interval, $routeParams, $window, ngProgress, $timeout, $route, categoryData) {
       /* var serviceTimer;*/
        var viewportwidth;
        var viewportheight;

        $scope.moduleName = 'category';
        $scope.noData = true;
        $rootScope.isTextOnly = yogiService.getViewMode();

        function hideSpinner(){
            if(typeof spinnerplugin !== 'undefined') {
                setTimeout(function(){
                   spinnerplugin.hide();
                },0)
            }
        }

        $scope.init = function() {

            $rootScope.menu.activate();
            $rootScope.menu.deactivate();

            $scope.noData = true;
            //$("#custom-navbar").css('display','block');
            $('.refresh-button').css('display', 'none');
            yogiService.setSelectedCategoryData(false);
            var hideSpinnerInterval = $interval(function(){
                hideSpinner();
                $interval.cancel(hideSpinnerInterval);
            }, 2000);

            yogiService.setCurrentModule($scope.moduleName);
            yogiService.setSelectedCategory($routeParams.catName);
            $scope.categoryData = [];
            $scope.serviceRefreshtimer = 500;
            if(categoryData){
                getCategoryDataSuccess(categoryData);
            } else {
                getCategoryDataFailure();
            }
            hideSpinner();

            $scope.categoryTitle = yogiService.getSelectedCategoryTitle();
            $scope.getViewportData();
            $scope.itemIndex = yogiService.getCategoryIndex();
            if($scope.itemIndex) { 
                $scope.initialCategorylimit =  Math.ceil($scope.itemIndex/16) * 16;
            } else {
                $scope.initialCategorylimit =  16;                
            }
            yogiService.setCategoryIndex(null);
            $scope.noData = false;

            $('.btn-toggle').click(function() {
                $(this).find('.btn').toggleClass('active');
                if ($(this).find('.btn-primary').size() > 0) {
                    $(this).find('.btn').toggleClass('btn-default');

                }
            });

            window.ga('create', 'UA-63688170-1', 'auto');
            window.ga('send', $scope.categoryTitle);
        };
         $scope.renderLocalData = function(){
            var localdata = yogiService.getLocalData(yogiService.getSelectedCategory());
            if(localdata) getCategoryDataSuccess(localdata);
        }
        $scope.getViewportData = function() {
            if (typeof window.innerWidth != 'undefined') {
                viewportwidth = window.innerWidth,
                viewportheight = window.innerHeight
            }

            else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth !=
                'undefined' && document.documentElement.clientWidth != 0) {
                viewportwidth = document.documentElement.clientWidth,
                viewportheight = document.documentElement.clientHeight
            }
            // older versions of IE
            else {
                viewportwidth = document.getElementsByTagName('body')[0].clientWidth,
                viewportheight = document.getElementsByTagName('body')[0].clientHeight
            }
        };
        $scope.initDataRefresh = function() {
            $interval.cancel($rootScope.serviceTimer);
            $rootScope.serviceTimer = $interval(function() {
                $scope.getcategoryData();
            }, $scope.serviceRefreshtimer);
        };

        $scope.getcategoryData = function() {
            ngProgress.start();
            var url = config.RESTURLS.HOST.BASE + "/" + yogiService.getSelectedCategory().toLowerCase() + ".json"; //config.RESTURLS.SUBURL[$scope.categortName.toUpperCase()];;
            yogiService.getData(url, "", "", getCategoryDataSuccess, getCategoryDataFailure);
            $interval.call($scope.progressBar, 300);
        };
        $scope.progressBar = function(){
            ngProgress.increment();
        };
        
        function getCategoryDataSuccess(result, status, headers, config) {
            yogiService.setLocalData(yogiService.getSelectedCategory(), result);

            $scope.lastUpdatedTime = moment(result.lastupdated).tz('Asia/Kolkata').format('DD MMMM gggg hh:mm A z');
            $scope.categoryData = result.feed;
            console.log(result.feed.length);
            $scope.categoryTitle = result.displayName;
            $scope.categoryColor = result.colorCode;
            $interval.cancel($rootScope.serviceTimer);
            $scope.serviceRefreshtimer = parseInt(result.refreshInt * 1000 * 60);
            $scope.initDataRefresh();
            
            $timeout(function() {
                //$scope.checkViewOptions()
                if($scope.itemIndex != null) {
                    $('html,body').animate({scrollTop: $('#newsContent_area').children().eq($scope.itemIndex).offset().top-125} );
                    $scope.itemIndex = null;
                } else {
                    if($('body').scrollTop() != 0){
                        $('body').animate({scrollTop: 0})
                    }
                }
            }, 500);
            $scope.noData = false;
            ngProgress.complete();
        };

        function getCategoryDataFailure(result, status, headers, config) {
            $scope.categoryData = [];
            $scope.noData = true;
        };

        $scope.selectNews = function(data, index) {

            //$rootScope.menu.deactivate();

            $interval.cancel($rootScope.serviceTimer);
            yogiService.setCategoryIndex(index);
            yogiService.setCurrentData(data);
            yogiService.setSelectedCategoryData(categoryData);
            $rootScope.$broadcast("openDetails", data)
        };

        $scope.toggleTextMode = function(mode){
            $rootScope.isTextOnly = mode;
            yogiService.setViewMode($rootScope.isTextOnly);
        }

        $scope.backBtn = function(){
            console.log('backBtn!!!!');
            $location.url('/home');
        }

        $scope.actionSwipeRight = function(event) {
            $scope.backBtn();
        }

        $scope.actionSwipeLeft = function(event, data, index) {
            $scope.selectNews(data, index);
        }

        var actionSwipeRight = $rootScope.$on("actionSwipeRight", function(data){
            $scope.actionSwipeRight();
        })

        var refresh = $rootScope.$on("refresh", function() {

            if (yogiService.getCurrentModule() == $scope.moduleName ){
                $interval.cancel($rootScope.serviceTimer);
                $scope.itemIndex = null;
                if($('body').scrollTop() != 0){
                    $('body').animate({scrollTop: 0})
                }
               /* $scope.getcategoryData();
                $('html,body').animate({scrollTop: 0})*/
                yogiService.setTimeExpired($routeParams.catName, true);
                $route.reload();
            }
        });
        $scope.$on('$destroy', function() {
            refresh();
            actionSwipeRight();
            $scope.itemIndex = null;
            $interval.cancel($rootScope.serviceTimer);
        });
        $scope.init();
    }
]);