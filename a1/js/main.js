
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
  var logs = [[ 'participant_id',
                'technique',
                'granularity',
                'open_windows',
                'trial_no',
                'stimuli',
                'user_response',
                'trial_time',
                'accuracy'
                ]];

  var pid = 'P1';
  $scope.rested = false;

  $http({method: 'GET', url: 'js/participants.json'}).
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
        if ($scope.currentBlockNum == 9 && !$scope.rested) {
          $scope.currentBlockNum = 8;
          $scope.currentTrialNum = 2;
          $scope.triggerBreak();
          return;
        }
      }
      $scope.currentBlock = $scope.blocks[$scope.currentBlockNum];

      var endTime = (new Date()).getTime();
      var trialTime = endTime - startTime;
      var stimuli = $('#stimuli').text();
      var response = $('#TextEditor_textArea').val();
      var row = [pid,
                $scope.currentBlock.technique,
                $scope.currentBlock.granularity,
                ($scope.currentTrialNum+1) * 2,
                $scope.currentBlockNum * 3 + $scope.currentTrialNum,
                stimuli,
                response,
                trialTime,
                stimuli == response ? 1 : 0
                ];

      logs.push(row);

      startTime = (new Date()).getTime();
      runTrial($scope.currentTrialNum, $scope.currentBlock.stimuli[$scope.currentTrialNum], isAutoComPaste);
    }
  }).
  error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });

  var interval;

  $scope.triggerBreak = function () {
    $('#Root').html('');
    $scope.break = true;
    interval = setInterval(function () {
      $scope.time -= 1;
      $scope.$apply();
      if ($scope.time <= 0) {
        $scope.endBreak();
      }
    }, 1000);
  }

  $scope.endBreak = function () {
    clearInterval(interval);
    $scope.rested = true;
    $scope.$apply()
    $scope.nextTrial();
  }

  $scope.generateCSV = function () {
    arrayToCSV(pid, logs);
  }

  $scope.time = 60;
});

autoComPasteApp.controller('PostController', function ($scope, $location) {
  $scope.message = 'Everyone come and see how good I look!';
});

