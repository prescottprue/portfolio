angular.module('portfolioApp')
  .controller('MainCtrl', function($scope, $mdDialog, projectService){
    console.log('Main controller');
    $scope.current = {}
    $scope.current.project = {name:'Home', pages:[{caption:'Click site'}]};
    var self = this;
     // list of `state` value/display objects
     $scope.data = {searchText:null};
     $scope.projects = projectService.projects;
     $scope.$watch('data.searchText', function(newValue, oldValue){
       $scope.projects
     });
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
        }).then(function(answer) {
          $scope.alert = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.alert = 'You cancelled the dialog.';
        });
      };
      $scope.closeProject = function (){
        $scope.currentProject = null;
      };
      $scope.addTag = function (tag){
        if($scope.data.searchText){
          var tagArray = $scope.data.searchText.split(",");
          if(tagArray.length > 1) {
            tagArray = _.without(tagArray, "", " ");
            console.log('tagArray:', tagArray);
            tagArray.push(tag);
            console.log('with push:', tagArray);
            $scope.data.searchText = tagArray.join(",");
          }

        } else {
          $scope.data.searchText = tag + ','
        }
      };
  })

  .controller('ProjectCtrl', function($scope, $mdDialog, $stateParams, projectService){
    console.log('Project controller');
      $scope.closeProject = function(){
        $scope.currentProject = null;
      };
  })
  function DialogController($scope, $mdDialog, projectService) {

    $scope.project = projectService.getCurrentProject();
    $scope.hide = function() {
      $mdDialog.hide();
    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }
