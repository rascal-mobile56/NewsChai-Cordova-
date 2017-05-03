yogiApp.controller('ctrlDetail', ["$scope", "$location", "$rootScope", "yogiService", "config", '$interval', '$routeParams', 'ngProgress', '$timeout','$route','$sce', 'feed',
    function($scope, $location, $rootScope, yogiService, config, $interval, $routeParams, ngProgress, $timeout, $route, $sce, feed, $cordovaInAppBrowser) {
        var viewportwidth;
        var viewportheight;
        $scope.viewHome = false;
        $scope.moduleName = 'detail';
        $scope.shareToggle = false;
        $scope.viewMode = "minimize";
        $scope.slickConfig = {
            dots: false,
            autoplay: true,
            autoplaySpeed: 5000,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            adaptiveHeight: true
        };
        $scope.videomodal = false;
        $rootScope.isTextOnly = yogiService.getViewMode();

        $scope.showModal = function () {
            $scope.videomodal = true;
        };
        $scope.hideModal = function () {
            $scope.videomodal = false;
        };
        $scope.selectNews = function(data, index) {
            //alert(index);
            console.warn(data, index);
            $interval.cancel($rootScope.serviceTimer);
            yogiService.setCategoryIndex(index);
            yogiService.setCurrentData(data);
            $rootScope.$broadcast("openDetails", data)
        };
        $scope.refreshCategoryData =  function () {
            ngProgress.start();
            var url = config.RESTURLS.HOST.BASE + "/" + yogiService.getSelectedCategory().toLowerCase() + ".json"; //config.RESTURLS.SUBURL[$scope.categortName.toUpperCase()];;
            yogiService.getData(url, "", "", function (result) {
                yogiService.setLocalData (yogiService.getSelectedCategory(), result);
                $scope.navbarShow = yogiService.checkExistNews($scope.detailsData.id);
                $interval.cancel($rootScope.serviceTimer);
                $scope.serviceRefreshtimer = parseInt(result.refreshInt * 1000 * 60);
                $scope.initDataRefresh();
            });
            $interval.call($scope.progressBar, 300);
        };
        $scope.initDataRefresh = function () {
            $interval.cancel($rootScope.serviceTimer);
            $rootScope.serviceTimer = $interval(function() {
                $scope.refreshCategoryData();
            }, $scope.serviceRefreshtimer);
        };
        $scope.changeNews = function (nav) {

            var id = $scope.detailsData.id;
            var localdata = yogiService.getDataCategory(yogiService.getSelectedCategory());
            var currentIndex = yogiService.getIndexNews(id);
            var newIndex;
            if (nav == 'next' && yogiService.checkExistNews(id).next){
                newIndex = currentIndex + 1;
                $scope.selectNews(localdata.feed[newIndex], newIndex);

            } else  if(nav == 'prev' && yogiService.checkExistNews(id).prev){
                newIndex = currentIndex - 1;
                $scope.selectNews(localdata.feed[newIndex], newIndex);
            }
        };
        $scope.share = function (event, message, link, image) {

            if (event == "facebook"){
                yogiService.shareFacebook(message, image, link)
            } else if(event == "whatsapp"){
                yogiService.shareWhatsapp(message, image, link)
            }
        };
        $scope.init = function() {
            console.log('feed', feed);
            $("#custom-navbar").css('display','none');
            yogiService.setCurrentModule($scope.moduleName);
            ngProgress.start();
            $scope.detailsData = feed;//yogiService.getCurrentData();

            if ($scope.detailsData.length == 0) {
                $rootScope.$broadcast("resetRoute");
            }
            $scope.getViewportData();
            console.log('yogiService.setCurrentData(data);', yogiService.getCurrentData())
            console.error('$scope.detailsData.id', $scope.detailsData.id);
            $scope.navbarShow = yogiService.checkExistNews($scope.detailsData.id);

            $scope.displayData($scope.detailsData);
            $('.btn-toggle').click(function() {
                $(this).find('.btn').toggleClass('active');
                if ($(this).find('.btn-primary').size() > 0) {
                    $(this).find('.btn').toggleClass('btn-default');

                }
            });
            $('html,body').animate({scrollTop: 0 });
            ngProgress.complete();
            $scope.refreshCategoryData();

            window.ga('create', 'UA-63688170-1', 'auto');
            window.ga('send', $scope.title);
        };
        $scope.getViewportData = function() {
            // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
            if (typeof window.innerWidth != 'undefined') {
                viewportwidth = window.innerWidth,
                viewportheight = window.innerHeight
            }
            // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
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

        $scope.toggleTextMode = function(mode){
            $rootScope.isTextOnly = mode;
            yogiService.setViewMode($rootScope.isTextOnly);
        }

        $scope.showImages = function(elem1, elem2) {
            $('#' + elem1).addClass('btn-primary active');
            $('#' + elem2).removeClass('btn-primary active');
            yogiService.setViewMode(false);
            // $(".panel-heading").css("height", "auto");
            // $(".panel-heading").show();
            $(".news_categories").css("font-weight", "normal");
            $(".news_categories").css("margin-top", "0px");
            $(".detail-images").show();
        };

        $scope.hideImages = function(elem1, elem2) {
            $('#' + elem1).addClass('btn-primary active');
            $('#' + elem2).removeClass('btn-primary active');
            yogiService.setViewMode(true);
            $(".detail-images").hide();
           // $(".panel-heading").css("height", "150px");
            if (viewportwidth > 1200 && viewportwidth < 1600) {
                $(".news-title").css("margin-top", "20px");
                $(".news_categories").css("padding-top", "-50px");
            }
            if (viewportwidth >= 1600) {
                $(".news-title").css("margin-top", "10px");
                $(".news_categories").css("margin", "0px");
            }
        };

        $scope.displayData = function(result) {
            $scope.category = result.category;
            $scope.categoryTitle = result.displayName;
            $scope.title = result.title;
            $scope.newsDate = moment(result.date).tz('Asia/Kolkata').format('DD MMMM gggg hh:mm A z');
            $scope.imageLink = (result.image) ? result.image.sort : null;
            $scope.videoLink = (result.image) ? $sce.trustAsResourceUrl(result.image.videoLink) : null;
            //$scope.videoLink = $sce.trustAsResourceUrl('https://www.youtube.com/embed/Ys3mXt3WqMA');
            $scope.slides = (result.image) ? result.image.slide : null;
            $scope.newsContent = result.content;
            $scope.source = result.source;
            $scope.sourceLink = result.link;
            /*$timeout(function() {
                $scope.checkViewOptions()
            }, 500);*/
        };
        $scope.gotoCategory = function() {
            if(typeof spinnerplugin !== 'undefined'){
                    spinnerplugin.show();
            }
            $timeout(function(){
                $location.url("/category/" + $scope.category);
            }, 0);
            //$rootScope.$broadcast("changeroute", $scope.category);
        };

        var speakSelect = function(value){

            TTS
                .speak({
                    text: value,
                    locale: 'en-GB',
                    rate: 1.5
                }, function () {
                    console.log('success');
                }, function (reason) {
                    console.log(reason);
                });
        };

        $scope.selectSpeaker = function(){

            speakSelect($scope.newsContent);

        };




        var timeShowShare;
        $scope.showShare = function (show, event) {
            event.stopPropagation();
            $scope.shareToggle = show;
            if (show){
                timeShowShare = $timeout(function () {
                    $scope.shareToggle = false;
                },5000)
            } else {
                $timeout.cancel(timeShowShare);
            }
        }
/*        $scope.checkViewOptions = function() {
            var isTextOnly = yogiService.getViewMode();
            if (isTextOnly == true) {
                $scope.hideImages('hide_images_det', 'show_images_det')
                //$scope.hideImages();
            } else {
                $scope.showImages('show_images_det', 'hide_images_det')
                //$scope.showImages();
            }

        };*/

        $scope.changeViewMode = function(mode) {
            $scope.viewMode = mode;
        }

        $scope.actionSwipeRight = function(event) {
            speakSelect("");
            if(event && event.hasOwnProperty('target') && !!$(event.target).closest('.slick-slider').length){
                event.preventDefault();
                return;
            }
            if ($scope.viewMode === 'minimize') {
                $scope.gotoCategory();
            }
            if ($scope.viewMode === 'full') {
                $scope.changeViewMode('minimize');
            }
        }

        $scope.actionSwipeLeft = function(event) {
            if(event && event.hasOwnProperty('target') && !!$(event.target).closest('.slick-slider').length){
                event.preventDefault();
                return;
            }
            if ($scope.viewMode === 'full') {
                speakSelect("");
                var url = ($scope.videoLink) ? $scope.videoLink : $scope.sourceLink;
                if(url){
                    var ref = cordova.InAppBrowser.open(url, '_blank');                    
                } 
            } else {
                $scope.changeViewMode('full');
            }
        }

        $scope.actionSwipeUp = function(){
            speakSelect("");
            if ($scope.viewMode === 'minimize') {
                $scope.changeNews('next');
            }
        }

        $scope.actionSwipeDown = function(){
            speakSelect("");
            if ($scope.viewMode === 'minimize') {
                $scope.changeNews('prev');
            }
        };

        var options = {
            location: 'no',
            clearcache: 'no',
            toolbar: 'yes'
        };


        $scope.goAppstore = function()
        {
            var ref1 = cordova.InAppBrowser.open( 'https://www.google.com', '_blank', options);
        };
        $scope.goPlaystore = function()
        {
            var ref2 = cordova.InAppBrowser.open('https://www.google.com', '_blank', options);
        };



        $scope.testShare = function(message, img, link){
            window.plugins.socialsharing.shareViaWhatsApp(message + '\n\n' + link, null, link, function() {
                console.log('share ok')
            }, function(errormsg){
                alert(errormsg)
            })
        }
        var refresh  = $rootScope.$on("refresh", function() {
            //console.log(yogiService.getCurrentModule(), $scope.moduleName );
            if(yogiService.getCurrentModule() == $scope.moduleName ){
                /*$scope.detailsData = [];
                $scope.category = "";
                $scope.categoryTitle = '';
                $scope.title = '';
                $scope.newsDate = '';
                $scope.imageLink = '';
                $scope.newsContent = '';
                $scope.source = '';
                $scope.sourceLink = '';
                setTimeout($scope.init, 1000);*/
                $route.reload();
            }
        });

        var actionSwipeRight = $rootScope.$on("actionSwipeRight", function(data){
            $scope.actionSwipeRight(data['event']);
        })
        $scope.$on('$destroy', function() {
            // console.log("destroy");
            refresh();
            actionSwipeRight();
            $scope.itemIndex = null;
            $interval.cancel($rootScope.serviceTimer);
        });
        $scope.init();
    }
]);