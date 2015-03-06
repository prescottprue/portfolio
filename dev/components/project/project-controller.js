angular.module('portfolioApp')

.controller('ProjectCtrl', function($scope, $mdDialog, $stateParams, projectService, $stateParams){
  console.log('Project controller');
  projectService.getCurrentProject($stateParams.pName).then(function(project){
    console.log('project:', project);
  	$scope.project = project;
  })
})
