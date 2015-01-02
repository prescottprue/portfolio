angular.module('portfolioApp')
  .controller('MainCtrl', function($scope){
    console.log('Main controller');
    $scope.currentSlide = {name:'Home', pages:[{caption:'Click site'}]};

    $scope.projects = [
        {
          name:'', 
          intro:'<p>Go to the right for projects</p>'
        },
        {
          name:'Basilar', 
          pages:[
            {
              image:{url:'img/Basilar/Basilar-Logo.png'}, 
              caption:'While DJing in college I felt that there must be a better way to interface with the djing software than was on the market. Using my experience with parametric modeling my team and I began to build a web based platform to allow DJs the ability to design their controller withina simple drag and drop interface. After completeing their designs the user would be able to share their designs or order the controller direclty from Basilar.',
              subCaption:'Go down to view the first controller design'
            },
            {
              image:{url:'img/Basilar/First-Lighting.jpg'}, 
              caption:'This design is based on a layout I concived while DJing so it was lovingly named the "Pruvit" controller.'
            }
          ]
        },

        {
          name:'Pyro', 
          pages:[
            {
              caption:'Pyro first page caption'
            },
            {
              image:{url:'img/Pyro/Pyro-Editor.png'}, 
              caption:'The Pyro editor panel allows users to program with every key stroke saved directly to the realtime cloud which means no saving required! We allow our users to go as in depth as they would like by providing hands on tutorials that start at the basics. Even the most advanced users are also comfortable in editor as it adheres to standards put into place by the  creaters of the advanced frameworks we use within the platform.'
            },
            {
              image:{url:'img/Pyro/Pyro-Tester.png'}, 
              caption:'After programming in the Editor tab you can view your changes to your app right away by going to the tester panel. You can see how your changes look before clicking the cloud button to push it to all of your users.'
            }
          ]
        },
        {
          name:'Other Projects', 
          pages:[
            {
              image:{url:'img/Misc/HeartHubDemo.png'}, 
              caption:"Hearthub is a project that started and presented with a team formed at MIT Hacking Medcine Grandhack event. It is a standardized platform/API for medical devices within hospitals. Our API is being designed to provide medical device developers an easy method for sharing their device's data directly with the hospital. The data provided by these developers is organized and provided to the hospital by our platform."
            },
            {
              image:{url:'img/Misc/HeartHubDemo.png'}, 
              caption:"Hearthub was a project my team worked on at the MIT Hacking Medcine Grandhack event. It is a standardized platform/API for medical devices within hospitals. Our API is being designed to provide medical device developers an easy method for sharing their device's data directly with the hospital. The data provided by these developers is organized and provided to the hospital by our platform."
            }
          ]
        },
      ];
    Reveal.addEventListener( 'slidechanged', function( event ) {
        // event.previousSlide, event.currentSlide, event.indexh, event.indexv
        var projectData = $scope.projects[event.indexh];
        var slideData = {project:projectData};
        if(projectData.hasOwnProperty('pages') && projectData.pages.length){
          slideData.slide = projectData.pages[event.indexv];
        }
        $scope.currentSlide = slideData;
        console.log('currentSlide:', $scope.currentSlide);
        $scope.$apply();
    } );
  })
      