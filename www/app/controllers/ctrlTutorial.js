/**
 * Created by developer on 5/30/17.
 */

yogiApp.controller('ctrlTutorial', ['$q', "$scope", "$location", "$rootScope", "yogiService", "config", '$interval', 'ngProgress', '$timeout','$route','$sce', '$cordovaDevice',
    function($q, $scope, $location, $rootScope, yogiService, config, $interval, ngProgress, $timeout, $route, $sce, $cordovaDevice) {

        var watchView = localStorage.getItem('watchView');
        if(watchView)
        {
            $location.url('/home');
        } else
        {
            console.log("no Value");
        }

    	$scope.init = function(){

            localStorage.setItem('watchView', '1');

    		document.addEventListener("deviceready", function () {
                if(navigator.splashscreen){
                    setTimeout(function(){
                        navigator.splashscreen.hide();
                    }, 0);
                }
                $rootScope.devicePlatform = $cordovaDevice.getPlatform();
            });

            $("#custom-navbar").css('display','none');


            $('.slider').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 10000,
                speed: 300,
                dots: true,
                infinite: true,
                arrows: false,
                cssEase: 'linear'
            });

    	}

    	$scope.gotohome = function(){
    		$location.url('/home');
    	}

    	$scope.$on('$destroy', function() {
            // console.log("destroy");
            
            $interval.cancel($rootScope.serviceTimer);
        });
        $scope.init();

    }
]);