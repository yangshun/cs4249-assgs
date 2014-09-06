
var autoComPasteApp = angular.module('AutoComPaste', ['ngRoute']);

// configure our routes
autoComPasteApp.config(function ($routeProvider) {
  $routeProvider
    .when('/pre', {
      templateUrl : 'views/pre.html',
      controller  : 'PreController'
    })
    .when('/instructions', {
      templateUrl : 'views/instructions.html',
      controller  : 'InstructionsController'
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
  $scope.user = {}
  $scope.user.pid = '';
});

autoComPasteApp.controller('LandingController', function ($scope, $location) {
  $scope.nextPage = function () {
    $location.path('pre');
  }
});

autoComPasteApp.controller('PreController', function ($scope, $location) {
  $scope.nextPage = function () {
    $location.path('instructions');
  }
});

autoComPasteApp.controller('InstructionsController', function ($scope, $location) {
  $scope.nextPage = function () {
    $location.path('trial');
  }
});

autoComPasteApp.controller('TrialController', function ($scope, $location) {
  $scope.message = 'Everyone come and see how good I look!';
  runTrial(1, false);
  var startTime = (new Date()).getTime();
  $scope.nextTrial = function () {
    var endTime = (new Date()).getTime();
    console.log(endTime - startTime);
    startTime = (new Date()).getTime();
    runTrial(2, true);
  }
});

autoComPasteApp.controller('PostController', function ($scope, $location) {
  $scope.message = 'Everyone come and see how good I look!';
});

