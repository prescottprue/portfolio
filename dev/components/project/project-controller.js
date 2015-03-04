angular.module('portfolioApp')

.controller('ProjectCtrl', function($scope, $mdDialog, $stateParams, projectService, $stateParams){
  console.log('Project controller');
  projectService.getCurrentProject({url:$stateParams.pName}).then(function(project){
  	$scope.project = project;
  })
})
