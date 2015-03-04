angular.module('portfolioApp')
  .controller('HomeCtrl', function($scope, $mdDialog, projectService){
    console.log('Home controller');
    $scope.data = {searchText:null};
    projectService.getProjects().then(function(loadedProjects){
      $scope.projects = loadedProjects;
      console.log('projects loaded:', $scope.projects);
    });
    $scope.commonTags = ['engineering', 'programming', 'javascript', 'volunteering'];
    $scope.data.selectedTags = null;
    $scope.openProject = function(key){
      console.log("open project:", key);
      $scope.project = projectService.getProject(key);
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'components/home/home-dialog.html',
      }).then(function() {

      }, function() {

      });
    };
    $scope.closeProject = function (){
      $scope.currentProject = null;
    };
    $scope.addTag = function (tag){
      if($scope.data.searchText){
        if(!$scope.data.selectedTags){
          $scope.data.selectedTags = $scope.data.searchText.split(",");
        }
        if($scope.data.selectedTags.length > 1) {
          $scope.data.selectedTags = _.without($scope.data.selectedTags, "", " ");
          console.log('$scope.data.selectedTags:', $scope.data.selectedTags);
          $scope.data.selectedTags.push(tag);
          console.log('with push:', $scope.data.selectedTags);
          $scope.data.searchText = $scope.data.selectedTags.join(",");
        }
      } else {
        $scope.data.searchText = tag + ','
      }
    };
  })


  function DialogController($scope, $mdDialog, projectService, $state, $stateParams) {
    projectService.getCurrentProject({url:$stateParams.pName}).then(function(project){
      $scope.project = project;
    });
    $scope.hide = function() {
      $mdDialog.hide();
    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.detail = function(projectData) {
      $state.go('project', {pName:$scope.project.url || $scope.project.name.toLowerCase()});
      $mdDialog.hide();
    };
  }
