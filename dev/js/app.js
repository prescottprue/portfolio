angular.module('portfolioApp', ['ui.router','picardy.fontawesome', 'ngMaterial'])
.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
  .state('projects', {
    url: '/',
    templateUrl: 'templates/home.html',
    controller:'MainCtrl'
  })
  $urlRouterProvider.otherwise("/");

})
.filter('searchName', function($window){
  return function (items, query) {
    var filtered = [];
    var letterMatch = new RegExp(query, 'i');
    var filtered = $window._.filter(items, function(item){
      if (letterMatch.test(item.name.substring(0, query.length))) {
          return true;
      }
      return false;
    })


    return filtered;
  };
})
