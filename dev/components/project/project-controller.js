angular.module('portfolioApp')

.controller('ProjectCtrl', function($scope, $mdDialog, $stateParams, projectService, $stateParams, $location){
  console.log('Project controller');
  $scope.data = {error:null, loading:true};
  projectService.getCurrentProject($stateParams.pKey).then(function(project){
    console.log('project loaded:', project);
    $scope.data.loading = false;
  	$scope.project = project;
  });
  $scope.openLink = function(path){
    console.log('opening link:', path);
    $location.$path(path);
  }
})
