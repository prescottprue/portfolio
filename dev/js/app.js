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
.filter('searchTags', function($window){
  var _ = $window._;
  return function (items, query) {
    if(query){
      var letterMatch = new RegExp(query, 'i');
      var filtered = _.filter(items, function(item){
        if(_.has(item, "tags") && _.isArray(item.tags)){
          var containsTag = _.some(item.tags, function(tag){
            return letterMatch.test(tag.substring(0, query.length));
          });
          return containsTag;
        }
        return false;
      })
      console.log('returning filtered:', filtered);

      return filtered;
    }
    return items;
  };
})
