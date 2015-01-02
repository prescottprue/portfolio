angular.module('portfolioApp', [])
.directive('slideshow', function() {
  return {
    scope: {
      projects: '=slideshow'
    },
    link: function(scope, elem, attrs) {
        elem.addClass('slides');
          for (var i = 0; i < scope.projects.length; i++) {
            var elementString = "<section>"
            if(scope.projects[i].hasOwnProperty('background')){
              elementString = '<section data-background="'+scope.projects[i].background +'">';
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
          Reveal.initialize({
            loop: false,
            controls:false,
            transition: Reveal.getQueryHash().transition || 'none'
          });

     
    }
  };
});