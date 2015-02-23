(function() {

  var github = function($http) {

    var getUser = function(username) {
      return $http.get("https://api.github.com/users/" + username)
        .then(function(response) {
          return response.data;
        })
    }

    var getUserRepo = function(repo) {
      return $http.get(repo)
        .then(function(response) {
          return response.data;
        })
    }
    
    var getRepoDetails = function(username, reponame) {
      var repo;
      var repoUrl = "https://api.github.com/repos/" + username + "/" + reponame;
      
      return $http.get(repoUrl)
        .then(function(response){
          repo = response.data;
          return $http.get(repoUrl + "/collaborators");
        })
        .then(function(reponse){
          repo.collaborators = response.data;
          return repo;
        });
    }

    return {
      getUser: getUser,
      getUserRepo: getUserRepo,
      getRepoDetails: getRepoDetails
      
    };
  };

  var module = angular.module("githubViewer");
  module.factory("github", github);

}());