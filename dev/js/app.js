// portfolioApp Module
var app = angular.module('portfolioApp', ['ui.router', 'slideshow', 'firebase']);
app.config(function($stateProvider, $urlRouterProvider){
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");
  // Home State
  $stateProvider
  .state('home', {
    url: "/",
    controller:"SlideshowCtrl",
    templateUrl: "components/slideshow/slideshow.html",
    resolve:{
      projects:function($q, slideshowService){
        var deferred = $q.defer();
        slideshowService.loadProjects().$loaded().then(function(projectsArray){
          deferred.resolve(projectsArray);
        });
        return deferred.promise;
      }
    }
  });
});
