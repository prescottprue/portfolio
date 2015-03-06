angular.module('portfolioApp')
  .controller('HomeCtrl', function($scope, $mdDialog, projectService, $state){
    console.log('Home controller');
    $scope.data = {searchText:null, loading:true, error:null, selectedTags:null};
    $scope.commonTags = ['engineering', 'programming', 'javascript', 'volunteering'];
    projectService.getProjects().then(function(loadedProjects){
      $scope.projects = loadedProjects;
      $scope.data.loading = false;
      console.log('projects loaded:', $scope.projects);
    });
    $scope.openProject = function(ind){
      console.log("open project:", $scope.projects[ind]);
      $scope.project = projectService.setCurrentProject($scope.projects[ind]);
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'components/home/home-dialog.html',
      }).then(function() {
        $scope.data.error = null;
      }, function(err) {
        $scope.data.error = err;
      });
    };
    $scope.setProject = function(key){
      console.log("open project:", key);
      $scope.project = projectService.setCurrentProject(key);
      $state.go('project', {pKey:key});
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
  /** Controller for dialog Popup that contains project information.
   * Project data is loaded using the project service.
   */
  function DialogController($scope, $mdDialog, projectService, $state, $stateParams) {
    projectService.getProject($stateParams.pName).then(function(project){
      $scope.project = project;
    });
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.detail = function(projectData) {
      $state.go('project', {pKey:$scope.project.$id});
      $mdDialog.hide();
    };
  }
