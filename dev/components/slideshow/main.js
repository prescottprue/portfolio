// Slideshow Component Module
angular.module('slideshow', ['firebase'])
.run(['$rootScope', function($rootScope){
  console.log('App is running.');
}])
.controller('SlideshowCtrl', ['$rootScope','$scope', 'projects', function($rootScope, $scope, projects){
  console.log('SlideshowCtrl', projects);
     projects.$loaded().then(function(projectsArray){
       console.log('projectsArray loaded', projectsArray);
       $scope.projects = projectsArray;
       console.log('$scope projects set', $scope.projects);

       // Slide change listener
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
       });

    });


  // Set first slide to home page
  $scope.currentSlide = {name:'Home', pages:[{caption:'Click site'}]};
  // Add slide listener


}])
.factory('slideshowService', ['$rootScope', '$q', '$firebase', function($rootScope, $q, $firebase){
  var ref = new Firebase("https://prue.firebaseio.com/portfolio");
  var sync = $firebase(ref);
  var projectSync = $firebase(ref.child('projects'));
  return {
    loadProjects:function(){
      console.log('[service] returning array promise');
      return projectSync.$asArray();
    },
    projectArray:function(){
      return sync.child('projects').$asArray();
    }
  }
}])
/**Reveal Directive
 * @description Requires projects scope variable that is the following format
 * projects:[
 *  {
 *    name:"Project Name",
 *    background:"url/image.html",
 *    pages:[
        {}
      ]
 *  }
 * ]
 */
.directive('slideshow', function() {
  return {
    scope: {
      projects: '=slideshow'
    },
    link: function(scope, elem, attrs) {
      elem.addClass('slides');
      // Watch scope for projects variable to load
      scope.$watch('projects', function(projects){
        if(projects){                                         // Check for projects val existance
          for (var i = 0; i < projects.length; i++) {         // Loop through array of projects
            if(typeof projects[i] == 'object'){               // Check that item is a project object
              var elementString = "<section>";                // Create element
              if(projects[i].hasOwnProperty('background')){   // Check for background
                elementString = '<section data-background="'+ projects[i].background +'">'; // Add background to element if it exists
              }
              var section = angular.element(elementString);   // Section element
              var steps = projects[i].pages;                  // Pages param as steps var
              if(!projects[i].hasOwnProperty('pages')){       // Project doesn't contain pages
                var content = angular.element(projects[i].content);    // Content element
                section.append(content);                      // Content ELement to section
              }
              else if (steps.length == 1) {                   // Check if there is only one step
                var content = angular.element("<h2>").html(projects[i].name);      //Project Name element
                section.append(content);                      // Project Name Element to section
              } else {
                for (var j = 0; j < steps.length; j++) {      // Loop through pages
                  var elementHtmlString = '<section class="reveal_section">';
                  var subSection = null;
                  if(steps[j].hasOwnProperty('image')){       //Check for image in page
                    if(!steps[j].image.hasOwnProperty('style')){  //No Background styling
                      elementHtmlString = '<section class="reveal_section" data-background="'+ steps[j].image.url+'">'//Background url from page
                      subSection = angular.element(elementHtmlString);
                    } else {                                  //Background styling exists
                      elementHtmlString = '<section class="reveal_section">';
                      subSection = angular.element(elementHtmlString);
                      subSection.append('<img style="'+steps[j].image.style+'" src="'+ steps[j].image.url +'">'); //Append image to subsection
                    }
                  }
                  // var content = angular.element("<h1>").html(steps[j].caption);
                  // subSection.append(caption);
                  section.append(subSection);//Add subsection to section element
                }
              }
              elem.append(section);                         //Append section to element
            }
          }
          // Setup Reveal
          Reveal.initialize({
            loop: false,
            controls:false,
            transition: Reveal.getQueryHash().transition || 'none'
          });
        }
      }, true);


    }
  };
});
