angular.module('portfolioApp')
  .controller('ContactCtrl', function($scope, $mdDialog, projectService, ENV, $mdToast){
    console.log('Contact controller');
    var ref = new Firebase(ENV.FBURL() + "/portfolio/messages");
    $scope.toastPosition = {
      bottom: false,
      top: true,
      left: false,
      right: true
    };
    $scope.getToastPosition = function() {
      return Object.keys($scope.toastPosition)
        .filter(function(pos) { return $scope.toastPosition[pos]; })
        .join(' ');
    };
    $scope.showToast = function(msg) {
      $mdToast.show(
        $mdToast.simple()
          .content(msg)
          .position($scope.getToastPosition())
          .hideDelay(3000)
      );
    };
    $scope.sendMessage = function(){
      if($scope.message && $scope.message.email && $scope.message.body){
        ref.push({email:$scope.message.email, content:$scope.message.body}, function(err){
          if(!err){
            $scope.showToast('Message sent successfully!');
          }
        })

      }
    };

  });
