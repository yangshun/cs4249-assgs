
var autoComPasteApp = angular.module('AutoComPaste', ['ngRoute']);

// configure our routes
autoComPasteApp.config(function ($routeProvider) {
  $routeProvider
    .when('/pre', {
      templateUrl : 'views/pre.html',
      controller  : 'PreController'
    })
    .when('/trial', {
      templateUrl : 'views/trial.html',
      controller  : 'TrialController'
    })
    .when('/post', {
      templateUrl : 'views/post.html',
      controller  : 'PostController'
    })
    .otherwise({
      templateUrl : 'views/main.html',
      controller  : 'LandingController'
    })
});

autoComPasteApp.controller('AppController', function ($scope, $location) {
  $scope.pid = '123';
});

autoComPasteApp.controller('LandingController', function ($scope, $location) {
  $scope.nextPage = function () {
    $location.path('pre');
  }
});

autoComPasteApp.controller('PreController', function ($scope) {
  console.log($scope.pid);
});

autoComPasteApp.controller('TrialController', function ($scope) {
  $scope.message = 'Everyone come and see how good I look!';
  runTrial();
});

autoComPasteApp.controller('PostController', function ($scope) {
  $scope.message = 'Everyone come and see how good I look!';
});

