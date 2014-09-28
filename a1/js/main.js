
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
    .when('/thankyou', {
      templateUrl : 'views/thankyou.html',
      controller  : 'ThankYouController'
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
  $scope.time = 2;

  var logs = [];
  var logsHeaders = [ 'participant_id',
                      'technique',
                      'granularity',
                      'open_windows',
                      'trial_no',
                      'stimuli',
                      'user_response',
                      'trial_time',
                      'accuracy'
                      ];
  logs.push(logsHeaders);

  var pid = 'P1';
  $scope.rested = false;
  $scope.trialOver = false;

  $http({method: 'GET', url: 'js/participants.json'}).
  success(function(data, status, headers, config) {
    $scope.blocks = data.data[pid];
    $scope.currentBlockNum = 0;
    $scope.currentTrialNum = 0;
    $scope.currentBlock = $scope.blocks[$scope.currentBlockNum];

    var isAutoComPaste = $scope.currentBlock.technique === 'autocompaste';
    runTrial(parseInt($scope.currentBlock.windows)/2-1, $scope.currentBlock.stimuli[$scope.currentTrialNum], isAutoComPaste);
    
    $('#TextEditor_textArea').addClass('mousetrap');
    Mousetrap.bind('meta+enter', function(e) {
      if ($scope.trialOver) {
        $scope.nextTrial(false, $scope.currentBlockNum * 3 + $scope.currentTrialNum + 1 == 54);
      }
      return false;
    });

    $scope.start = function () {
      $scope.trialOver = true;
      $scope.currentBlockNum = 0;
      $scope.currentTrialNum = 0;
      $scope.currentBlock = $scope.blocks[$scope.currentBlockNum];
      $('#TextEditor_textArea').val('');
    }

    var startTime = (new Date()).getTime();
    $scope.nextTrial = function (isCallback, endTrial) {
      if ($scope.trialOver) {
        $scope.currentTrialNum++;
      }
      if ($scope.currentTrialNum >= 3 && !endTrial) {
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
      var response = $.trim($('#TextEditor_textArea').val());
      var row = [pid,
                $scope.currentBlock.technique,
                $scope.currentBlock.granularity,
                $scope.currentBlock.windows,
                $scope.currentBlockNum * 3 + $scope.currentTrialNum,
                $.trim(stimuli.replace(',', ' ')),
                $.trim(response.replace(',', ' ')),
                trialTime,
                stimuli == response ? 1 : 0
                ];

      if ($scope.trialOver) {
        logs.push(row);
      }

      if ($scope.currentBlockNum * 3 + $scope.currentTrialNum == 54) {
        arrayToCSV(logs);
        $location.path('post');
        return;
      }

      startTime = (new Date()).getTime();
      
      if (!endTrial) {
        var isAutoComPaste = $scope.currentBlock.technique === 'autocompaste';
        runTrial(parseInt($scope.currentBlock.windows)/2-1, $scope.currentBlock.stimuli[$scope.currentTrialNum], isAutoComPaste);
      }

      if (isCallback) {
        $scope.$apply();
      }

      $('#TextEditor_textArea').focus();
    }
  }).
  error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });

  var interval;
  $scope.triggerBreak = function () {
    if (!$scope.break) {
      $scope.break = true;
      $('#Root').html('');
      interval = setInterval(function () {
        $scope.time -= 1;
        $scope.$apply();
        if ($scope.time <= 0) {
          $scope.endBreak();
        }
      }, 1000);
    }
  }

  $scope.endBreak = function () {
    clearInterval(interval);
    $scope.rested = true;
    $scope.$apply()
    $scope.nextTrial(true, false);
  }

  $scope.generateCSV = function () {
    arrayToCSV(logs);
  }
});

autoComPasteApp.controller('PostController', function ($scope, $location) {
  $scope.nextPage = function () {
    $location.path('thankyou');
  }
});

autoComPasteApp.controller('ThankYouController', function ($scope, $location) {
  $scope.homePage = function () {
    $location.path('/');
  }
});

