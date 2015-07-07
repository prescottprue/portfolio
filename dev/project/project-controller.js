angular.module('portfolioApp')

.controller('ProjectCtrl', function ($scope, $mdDialog, $stateParams, projectService, $stateParams, $location, $analytics, $window){
  console.log('Project controller');
  $scope.data = {error:null, loading:true};
  $analytics.eventTrack('ProjectLoaded', {  category: 'Projects', label: 'Successful loading of controller' });
  projectService.getCurrentProject($stateParams.pKey).then(function(project){
    console.log('project loaded:', project);
    $scope.data.loading = false;
  	$scope.project = project;
  });
  $scope.openLink = function(path){
    console.log('opening link:', path);
    $window.open(path, '_blank');
  };
})
