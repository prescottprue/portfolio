angular.module('portfolioApp', ['picardy.fontawesome'])
// .directive('slide', function(){
//   return{
//     template:'<section class="reveal_section"></section>',
//     link:function(){
//
//     }
//   }
// })
.directive('portfolio', function() {
  return {
    scope: {
      projects: '=projects'
    },
    link: function(scope, elem, attrs) {
      for (var i = 0; i < scope.projects.length; i++) {
        var section = angular.element("<section>");
        if(scope.projects[i].hasOwnProperty('background')){ //Project has background
          section.attr('data-background', scope.projects[i].background);
        }
        //Include content from url if there are not pages
        if(scope.projects[i].hasOwnProperty('contentUrl') && !scope.projects[i].hasOwnProperty('pages')){ //content url exists and pages dont
          console.log('loading from url:', scope.projects[i].contentUrl);
          section.addClass('reveal_section');
          var contentElement = angular.element('<div>');
          contentElement.attr('ng-include', scope.projects[i].contentUrl);
          console.log('element:', contentElement);
          section.append(contentElement);
        }
        //Include content from content param (in html) if there are not pages
        if (scope.projects[i].hasOwnProperty('content') && !scope.projects[i].hasOwnProperty('pages')){ //content not pages
          var content = angular.element(scope.projects[i].content);
          section.append(content);
        }
        //Build Project pages
        if(scope.projects[i].hasOwnProperty('pages')){ // Project contains pages
          var pages = scope.projects[i].pages;
          if (pages.length == 1) { //There is only one page
            var content = angular.element("<h2>").html(scope.projects[i].name); //Project Name Element
            section.append(content);
          } else { //There are multiple pages
            for (var j = 0; j < pages.length; j++) { //Loop through pages
              var subSection = angular.element('<section>');
              subSection.addClass('reveal_section');
              if(pages[j].hasOwnProperty('background')) { //Page has background
                subSection.attr('data-background', pages[j].background);
              }
              if(pages[j].hasOwnProperty('image')) { //Page has image
                var img = angular.element('<img>');
                img.attr('src', pages[j].image.url);
                if(pages[j].image.hasOwnProperty('style')){
                  img.attr('style', pages[j].image.style);
                  subSection.append(img);
                }
              }
              section.append(subSection); //Append page to project
            }
          }
        }
        elem.parent().append(section); //Append Project to slides
      }
      Reveal.initialize({
        loop: false,
        controls:false,
        transition: Reveal.getQueryHash().transition || 'none'
      });
    }
  }
})
