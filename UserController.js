(function() {

  var app = angular.module("githubViewer");

  var UserController = function($scope, github, $routeParams) {

    var onComplete = function(data) {
      $scope.user = data;
      github.getUserRepo($scope.user.repos_url)
        .then(onRepos, onError)
    }

    var onRepos = function(data) {
      $scope.repos = data;
    };

    var onError = function(reason) {
      $scope.error = "could not reach";
    }

    $scope.username = $routeParams.username;
    $scope.repoSortOrder = "Language";
    github.getUser($scope.username).then(onComplete, onError);
  }

  app.controller("UserController", UserController);
})();