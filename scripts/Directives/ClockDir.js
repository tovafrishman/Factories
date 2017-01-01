myApp.directive('clockDir', function ($timeout) {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'Clock.html',
      
    }
});