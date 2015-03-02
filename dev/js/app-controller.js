angular.module('portfolioApp')
  .controller('MainCtrl', function($scope, $mdDialog, projectService){
    console.log('Main controller');
    $scope.data = {searchText:null};
    projectService.getProjects().then(function(loadedProjects){
      $scope.projects = loadedProjects;
      console.log('projects loaded:', $scope.projects);

    });
    $scope.commonTags = ['engineering', 'programming', 'javascript', 'volunteering'];
    $scope.data.selectedTags = null;
    $scope.openProject = function(name, ev){
      $scope.project = projectService.setCurrentProject({name:name});
      // $state.go('')
      // $mdDialog.show(
      //   $mdDialog.alert()
      //     .title('This is an alert title')
      //     .content('You can specify some description text in here.')
      //     .ariaLabel('Password notification')
      //     .ok('Got it!')
      //     .targetEvent(ev)
      // );
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'templates/project-dialog.html',
        targetEvent: ev,
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

  .controller('ProjectCtrl', function($scope, $mdDialog, $stateParams, projectService){
    console.log('Project controller');
    $scope.project = projectService.getCurrentProject();
  })
  function DialogController($scope, $mdDialog, projectService, $state, $stateParams) {
    $scope.project = projectService.getCurrentProject({name:$stateParams.pName});
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
