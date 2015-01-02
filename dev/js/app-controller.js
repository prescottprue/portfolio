angular.module('portfolioApp')
  .controller('MainCtrl', function($scope){
    console.log('Main controller');
    $scope.currentSlide = {name:'Home', pages:[{caption:'Click site'}]};

    $scope.projects = [
        {
          name:'', 
          intro:'Go to the right for projects'
        },
        {
          name:'Basilar', 
          pages:[
            {
              image:{url:'img/Basilar/Basilar-Logo.png'}, 
              caption:'first page caption'
            },
            {
              image:{url:'img/Basilar/Basilar-Logo.png'}, 
              caption:'basilar second page'
            }
          ]
        },

        {
          name:'Pyro', 
          pages:[
            {
              image:{url:'img/Pyro/Pyro-Editor.png'}, 
              caption:'Pyro first page caption'
            }
          ]
        },
        {
          name:'Pyro', 
          pages:[
            {
              image:{url:'img/Pyro/Pyro-Editor.png'}, 
              caption:'Pyro first page caption'
            }
          ]
        },
      ];
    Reveal.addEventListener( 'slidechanged', function( event ) {
        // event.previousSlide, event.currentSlide, event.indexh, event.indexv
        var projectData = $scope.projects[event.indexh];
        var slideData = {project:projectData};
        if(projectData.pages.length){
          slideData.slide = projectData.pages[event.indexv];
        }
        $scope.currentSlide = slideData;
        console.log('currentSlide:', $scope.currentSlide);
        $scope.$apply();
    } );
  })
      