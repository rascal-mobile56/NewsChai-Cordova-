yogiApp.controller('ctrlHome', ['$q', "$scope", "$location", "$rootScope", "yogiService", "config", '$interval', 'ngProgress', '$timeout','$route','$sce', '$cordovaDevice', 'homeData',
    function($q, $scope, $location, $rootScope, yogiService, config, $interval, ngProgress, $timeout, $route, $sce, $cordovaDevice, homeData) {
        /*var serviceTimer;*/
        var viewportwidth;
        var viewportheight;

        $scope.slickConfig = {
            dots: false,
            autoplay: true,
            autoplaySpeed: 10000,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            adaptiveHeight: true
        };
        $scope.moduleName = 'home';
        $scope.deliberatelyTrustDangerousSnippet = function(txt) {
               return $sce.trustAsHtml(txt);
            };

        $rootScope.isTextOnly = yogiService.getViewMode();
        
        $scope.init = function() {


            $("#custom-navbar").css('display','block');
            $('.refresh-button').css('display','block');
            yogiService.setCurrentModule($scope.moduleName);
            yogiService.setSelectedCategory('BREAKING');
            //$rootScope.serviceTimer="";
            $scope.homePagedata = [];
            $scope.serviceRefreshtimer = 500;
            if(homeData){
                getHomepagedataSuccess(homeData);
            } else {
                getHomepagedataFailure();
            }

            document.addEventListener("deviceready", function () {
                if(navigator.splashscreen){
                    setTimeout(function(){
                        navigator.splashscreen.hide();
                    }, 0);
                }
                $rootScope.devicePlatform = $cordovaDevice.getPlatform();
            });

            $scope.getHomepagedata();
            $scope.itemIndex = yogiService.getHomeIndex();
            // console.log("-----HOMEINDEX ", $scope.itemIndex);
            yogiService.setHomeIndex(null);
            $scope.noData = false;
            $('.btn-toggle').click(function() {
                $(this).find('.btn').toggleClass('active');
                if ($(this).find('.btn-primary').size() > 0) {
                    $(this).find('.btn').toggleClass('btn-default');

                }
            });
        };

        function backgroundCaterogoryLoading() {
            var requests = [];
            $scope.homePagedata.forEach(function(item){
                requests.push(yogiService.getCaterotyData(config.RESTURLS.HOST.BASE + "/" + item.category.toLowerCase() + ".json", item.category).catch(angular.noop))
            });
            $q.all(requests)
                .then(function(cursor){
                    cursor.forEach(function(response){
                        if(response){
                            yogiService.setLocalData(response.data.category, response.data);
                        }
                    })
                })
        }

        $scope.initDataRefresh = function() {
            $interval.cancel($rootScope.serviceTimer);
            $rootScope.serviceTimer = $interval(function() {
                $scope.getHomepagedata(true);
            }, $scope.serviceRefreshtimer);
        };
        $scope.renderLocalData = function(){
            // console.log("renderLocalData ", $scope.moduleName);
            var localdata = yogiService.getLocalData($scope.moduleName);
            if(localdata) getHomepagedataSuccess(localdata);
        }
        $scope.getViewportData = function() {
            // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight

            if (typeof window.innerWidth != 'undefined') {
                viewportwidth = window.innerWidth,
                viewportheight = window.innerHeight
            }

            // IE6 in standards complia nt mode (i.e. with a valid doctype as the first line in the document)
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

        var dataNow;
        var dataDelta;
        $scope.getHomepagedata = function(isFull) {
            ngProgress.start();
            dataNow = moment();
            var urlBreak = config.RESTURLS.HOST.BASE + "/" + yogiService.getSelectedCategory().toLowerCase() + ".json";
            yogiService.getData(urlBreak, "", "", successBreaking, getHomepagedataFailure);
            
            if(isFull) {
                var url = config.RESTURLS.HOST.BASE + config.RESTURLS.SUBURL.HOME;
                yogiService.getData(url, "", "", getHomepagedataSuccess, getHomepagedataFailure);
            }
            
            $interval.call($scope.progressBar, 300);
        };
        $scope.progressBar = function(){
            ngProgress.increment();
        }
        function successBreaking(result) {
            yogiService.setLocalData(yogiService.getSelectedCategory(), result);
            dataDelta = moment.duration(moment().diff(dataNow))._milliseconds;
            if(dataDelta < 1500) {
                backgroundCaterogoryLoading();                
            }
        }
        function getHomepagedataSuccess(result, status, headers, config) {
            $scope.noData = false;
            yogiService.setTimeExpired($scope.moduleName);
            $interval.cancel($scope.progressBar);
            // console.log("serviceTimer " , $rootScope.serviceTimer, result);
            yogiService.setLocalData($scope.moduleName, result);
            var breakingNews = [];
            var data=result.feed;
            var homePagedata = [];
            angular.forEach(data, function(entry, index) {
                if (entry.category.toLowerCase() == "breaking") {
                    breakingNews.push(entry);
                 //   data.splice(index,1);
                }else {
                    homePagedata.push(entry)
                }
            });

            $scope.homePagedata = homePagedata;
            $rootScope.$broadcast("breakingNews", breakingNews)
            angular.forEach($scope.homePagedata, function(entry, index) {
                entry.idName = "menu_" + entry.category.toLowerCase();
                entry.borderName = "border_" + entry.category.toLowerCase();
            });
           // alert("Breaking News updating...");
            $interval.cancel($rootScope.serviceTimer);
            //alert(result.refreshInt);
            $scope.serviceRefreshtimer = parseInt(result.refreshInt  * 1000 * 60);
            console.log('serverRefresh timer: '+$scope.serviceRefreshtimer);
            $scope.initDataRefresh();
            //setTimeout($scope.checkViewOptions, 1000);
            $timeout(function() {
                //$scope.checkViewOptions();
                if($scope.itemIndex != null) {
                    $('html,body').animate({scrollTop: $('#categorynews_area').children().eq($scope.itemIndex).offset().top - 125 });
                    $scope.itemIndex = null;
                    //window.scrollTo(0, $('#newsContent_area').children().eq($scope.itemIndex).offset().top-125)
                }
            }, 500);
            ngProgress.complete();
        };
        function getHomepagedataFailure(result, status, headers, config) {
            $scope.homePagedata = [];
            //$interval.cancel(serviceTimer);
            $scope.noData = true;
            //alert("No Data available. Please try again.");
        };
        $scope.selectNewsItem = function (data, index) {

            if(!yogiService.getDataCategory(yogiService.getSelectedCategory())){
                return;
            }
            $interval.cancel($rootScope.serviceTimer);
            yogiService.setSelectedCategoryTitle(data.displayName);

            yogiService.setCategoryIndex(index);
            yogiService.setCurrentData(data);

            $rootScope.$broadcast("openDetails", data);

        };


        $scope.selectNews = function(data, index) {
            if(typeof spinnerplugin !== 'undefined'){
                spinnerplugin.show();
            }
            $interval.cancel($rootScope.serviceTimer);
            // console.log("------selectNews-----", data, index)
            yogiService.setHomeIndex(index);
            yogiService.setSelectedCategoryTitle(data.displayName);
            $location.url("/category/" + data.category);
            //$rootScope.$broadcast("changeroute",  data.category );
        };

        $scope.toggleTextMode = function(mode){
            $rootScope.isTextOnly = mode;
            yogiService.setViewMode($rootScope.isTextOnly);
        }

        var unsubscribeRefresh  = $rootScope.$on("refresh", function() {
            if(yogiService.getCurrentModule() == $scope.moduleName ){
                $interval.cancel($rootScope.serviceTimer);
                $scope.itemIndex = null;
               // this.getHomepagedata();
               if($('body').scrollTop() != 0){
                   $('body').animate({scrollTop: 0})
               }
                //$location.url("/");
                yogiService.setTimeExpired($scope.moduleName, true);
                $route.reload();
            }
        });
        $scope.$on('$destroy', function() {
            // console.log("destroy");
            unsubscribeRefresh();
            $interval.cancel($rootScope.serviceTimer);
        });
        $scope.init();
    }
]);