angular.module('portfolioApp')
  .controller('ContactCtrl', function($scope, $mdDialog, contactService){
    console.log('Contact controller');
    $scope.sendMessage = function(){
      contactService.sendEmail($scope.message).then(function(){
        console.log('Email sent successfully:', $scope.message);
      });
    };
  })
  .factory('contactService', ['$http', '$q', function($http, $q){
    return {
      sendEmail:function(messageData){
        var deferred = $q.defer();
        var emailApiUrl = "https://api.mailgun.net/v2/sandboxa59684366f4e47d3ad6786d9158ed7b1.mailgun.org/messages";
        var postObj = {
          method:'POST',
          url: emailApiUrl,

          data:{
            auth:"api:key-21477810cd64590bc6cfa18b969d5e56",
            from:"Mailgun Sandbox <postmaster@sandboxa59684366f4e47d3ad6786d9158ed7b1.mailgun.org>", 
            to:"prescottprue@gmail.com",
            subject:"Site Message",
            text: messageData.email + " sent " + messageData.content
          }
         
        };
        $http(postObj).success(function(data, status, headers, config){
          console.log('Email post successful:', data, status);
          deferred.resolve(data);
        }).error(function(data, status, headers, config){
          console.error('Error with email post:', status, headers);
          deferred.reject(status);
        });
        return deferred.promise;
      }
    }
  }])
