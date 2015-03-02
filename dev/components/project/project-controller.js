angular.module('portfolioApp')

.controller('ProjectCtrl', function($scope, $mdDialog, $stateParams, projectService){
  console.log('Project controller');
  $scope.project = projectService.getCurrentProject();
})
