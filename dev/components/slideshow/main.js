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
.directive('reveal', function() {
  return {
    scope: {
      projects: '=slideshow'
    },
    link: function(scope, elem, attrs) {
      elem.addClass('slides');
      scope.$watch('projects', function(newVal){
        if(newVal){
          // Loop through array of projects
          for (var i = 0; i < scope.projects.length; i++) {
            if(typeof scope.projects[i] == 'object'){
              var elementString = "<section>";
              // Add background to element if it exists
              if(scope.projects[i].hasOwnProperty('background')){
                elementString = '<section data-background="'+ scope.projects[i].background +'">';
              }
              var section = angular.element(elementString);
              var steps = scope.projects[i].pages;
              // Project doesn't contain pages
              if(!scope.projects[i].hasOwnProperty('pages')){
                var content = angular.element(scope.projects[i].content);
                section.append(content);
              }
              //if there is only one step
              else if (steps.length == 1) {
                var content = angular.element("<h2>").html(scope.projects[i].name);
                section.append(content);
              } else {
                for (var j = 0; j < steps.length; j++) {
                  var elementHtmlString = '<section class="reveal_section">'
                  var subSection = null;
                  if(steps[j].hasOwnProperty('image')){
                    if(!steps[j].image.hasOwnProperty('style')){
                      elementHtmlString = '<section class="reveal_section" data-background="'+ steps[j].image.url+'">'
                      subSection = angular.element(elementHtmlString);
                    } else {
                      elementHtmlString = '<section class="reveal_section">'
                      subSection = angular.element(elementHtmlString);
                      subSection.append('<img style="'+steps[j].image.style+'" src="'+ steps[j].image.url +'">')
                    }
                  }
                  // var content = angular.element("<h1>").html(steps[j].caption);
                  // subSection.append(caption);
                  section.append(subSection);
                }
              }
              elem.append(section);
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
