angular.module('portfolioApp', ['ui.router','picardy.fontawesome', 'ngMaterial', 'firebase'])
.config(function($stateProvider, $urlRouterProvider, $mdThemingProvider){
  $stateProvider
  .state('navbar', {
    templateUrl: 'templates/navbar.html',
    abstract:true
  })
  .state('home', {
    parent:'navbar',
    url: '/',
    templateUrl: 'templates/home.html',
    controller:'MainCtrl'
  })
  .state('project', {
    parent:'navbar',
    url: '/:pName',
    templateUrl: 'templates/project.html',
    controller:'ProjectCtrl'
  })
  $urlRouterProvider.otherwise("/");
  $mdThemingProvider.theme('default')
     .primaryPalette('blue')
     .accentPalette('pink');
})
.filter('search', function(projectService){
  return function (items, query) {
    if(query && _.isString){
      return _.filter(items, function(item){
        return item.matchesSearch(query);
      })
    }
    return items;
  };
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
  /** Check item parameters for a given tag
   * @params {Object} item Item to search tags of
   * @params {String} tagsStr tags seperated by ", "
   * @returns {Boolean} whether or not the item contains a tag
   */
  function checkItemForTag(item, tagStr) {
    if(tagStr == "" || tagStr == " ") return true;
    var letterMatch = new RegExp(tagStr, 'i');
    if(_.has(item, "tags") && _.isArray(item.tags)) {
      // _.some finds if item contains tag
      var containsTag = _.some(item.tags, function(tag){
        return letterMatch.test(tag.substring(0, tagStr.length));
      });
      return containsTag;
    }
    return false;
  }

  return function (items, query) {
    if(query && _.isString(query)){
      var tagsArray = query.split(",");
      return _.filter(items, function(item){
        if(tagsArray.length > 1) {
          //multiple tags
          //_.some would show projects that contain any of the tags
          return _.every(tagsArray, function(tag){
            return checkItemForTag(item, tag);
          });
        }
        //Single tag
        return checkItemForTag(item, query);
      });
    }
    //Query is null
    return items;
  };
})
.directive('projectInfo', function(){
  return {
    template:'<span md-highlight-text="searchText" style="padding-right:5px;">{{project.name}}</span><span md-highlight-text="searchText" style="font-size:.8em;" ng-repeat="tag in matchingTags track by $index">{{tag}}</span>',
    controller: function($scope, projectService,$timeout){
      $scope.$watch('searchText', function(newVal, oldVal){
        $timeout(function(){
          if(angular.isDefined($scope.tags)){
            //[TODO] Find the fastest method here
            // $scope.matchingTags = $scope.project.matchingTagsString(newVal); // Seems to be slower than service function
            $scope.matchingTags = projectService.findMatchingTags($scope.tags, newVal);
            // console.log('matching tags:', $scope.matchingTags);
          }
        });
      });
    },
    scope:{
      searchText: '=searchText',
      tags: '=tags',
      project:'=project'
    }
  }
})
