
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

autoComPasteApp.controller('TrialController', function ($scope, $location, $http) {
  
  var pid = 'P1';

  $http({method: 'GET', url: '/js/participants.json'}).
  success(function(data, status, headers, config) {
    $scope.blocks = data.data[pid];
    $scope.currentBlockNum = 0;
    $scope.currentTrialNum = 0;
    $scope.currentBlock = $scope.blocks[$scope.currentBlockNum];

    var isAutoComPaste = $scope.currentBlock.technique === 'autocompaste';
    runTrial($scope.currentTrialNum, $scope.currentBlock.stimuli[$scope.currentTrialNum], isAutoComPaste);

    var startTime = (new Date()).getTime();
    $scope.nextTrial = function () {
      $scope.currentTrialNum++;
      if ($scope.currentTrialNum >= 3) {
        $scope.currentTrialNum = $scope.currentTrialNum%3;
        $scope.currentBlockNum++;
      }
      $scope.currentBlock = $scope.blocks[$scope.currentBlockNum];

      var endTime = (new Date()).getTime();
      console.log('Timing:', endTime - startTime);
      startTime = (new Date()).getTime();
      
      runTrial($scope.currentTrialNum, $scope.currentBlock.stimuli[$scope.currentTrialNum], isAutoComPaste);
    }
  }).
  error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });

  
});

autoComPasteApp.controller('PostController', function ($scope, $location) {
  $scope.message = 'Everyone come and see how good I look!';
});

