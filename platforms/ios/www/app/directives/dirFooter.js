yogiApp.directive("dirFooter", ["$location", "$rootScope", "yogiService", "config",
    function($location, $rootScope, yogiService, config) {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: "app/views/viewFooter.html",
            controller: function($scope, $location, $rootScope, yogiService, config) {}
        }
    }
]);