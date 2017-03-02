angular.module('dotdotdot-angular', [])
.directive('dotdotdot', function(){
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.$evalAsync(function () {
                element.dotdotdot({
                    wrap: 'letter'
                });
            });
        }
    }
});