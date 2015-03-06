angular.module('portfolioApp')

.directive('projectInfo', function(){
  // [TODO] Make this not be a watcher
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
});
