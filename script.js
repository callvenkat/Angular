/*
(function() {
  var createWorker = function() {

    var workCount = 0;

    var task1 = function() {
      workCount += 1;
      console.log("task1 " + workCount);
    };

    var task2 = function() {
      workCount += 1;
      console.log("task2 " + workCount);
    };

    return {
      Job1: task1,
      Job2: task2
    };

  };

  var work = createWorker();

    work.Job1();
  work.Job2();

}());
*/

/*
(function(angular) {
  'use strict';
  var person = {
    firstName: "Venkat",
    lastName: "M",
    imageSrc: "http://odetocode.com/images/scott_allen_2.jpg"
  };

  angular.module('scopeExample', [])
    .controller('MainController', ['$scope',

      function($scope) {
        $scope.message = "helloooo";
        $scope.person = person;
      }
    ], ['$http',

      function($http) {
        $http.get("https://api.github.com/users/robconery")
          .then(function(response) {
            person.firstName: response.data;
          });
      }
    ]);
})(window.angular);
*/

var person = {
  firstName: "Venkat",
  lastName: "M",
  imageSrc: "http://odetocode.com/images/scott_allen_2.jpg"
};

function formatOutput(response) {
  person.firstName = response.data;

}

/*
(function() {

  var app = angular.module("githubViewer", []);

  var MainController = function($scope, $http, $interval, $log, $anchorScroll, $location) {

    var onComplete = function(response) {
      $scope.user = response.data;
      $http.get($scope.user.repos_url)
        .then(onRepos, onError)
    }

    var onRepos = function(response) {
      $scope.repos = response.data;
      $location.hash("userDetails");
      $anchorScroll();
    };

    var onError = function(reason) {
      $scope.error = "could not reach";
    }

    var decrementCountDown = function() {
      $scope.countDown -= 1;
      if ($scope.countDown < 1) {
        $scope.search($scope.username);
      }
    };

    var countDownInterval = null;
    var startCountDown = function() {
      countDownInterval = $interval(decrementCountDown, 1000, $scope.countDown);
    }

    $scope.search = function(username) {
      $log.info("https://api.github.com/users/" + username);
      $http.get("https://api.github.com/users/" + username)
        .then(onComplete, onError);
      if (countDownInterval) {
        $interval.cancel(countDownInterval);
        $scope.countDown = null;
      }
    }

    $scope.message = "helloooo";
    $scope.username = "angular";
    $scope.repoSortOrder = "Language";
    $scope.countDown = 5;
    startCountDown();
  }

  app.controller("MainController", MainController);
})(window.githubViewer);
*/


(function() {

  var app = angulcimar.module("githubViewer", []);

  var MainController = function($scope, github, $interval, $log, $anchorScroll, $location) {

    var onComplete = function(data) {
      $scope.user = data;
      $log.info($scope.user);
      github.getUserRepo($scope.user.repos_url)
        .then(onRepos, onError)
    }

    var onRepos = function(data) {
      $scope.repos = data;
      $log.info($scope.repos);
      $location.hash("userDetails");
      $anchorScroll();
    };

    var onError = function(reason) {
      $scope.error = "could not reach";
    }

    var decrementCountDown = function() {
      $scope.countDown -= 1;
      if ($scope.countDown < 1) {
        $scope.search($scope.username);
      }
    };

    var countDownInterval = null;
    var startCountDown = function() {
      countDownInterval = $interval(decrementCountDown, 1000, $scope.countDown);
    }

    $scope.search = function(username) {
      $log.info("https://api.github.com/users/" + username);
      github.getUser(username)
        .then(onComplete, onError);
      if (countDownInterval) {
        $interval.cancel(countDownInterval);
        $scope.countDown = null;
      }
    }

    $scope.message = "helloooo";
    $scope.username = "angular";
    $scope.repoSortOrder = "Language";
    $scope.countDown = 5;
    startCountDown();
  }

  app.controller("MainController", MainController);
})(window.githubViewer);