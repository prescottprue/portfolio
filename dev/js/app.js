angular.module('portfolioApp', [])
.directive('slideshow', function() {
  return {
    scope: {
      projects: '=slideshow'
    },
    link: function(scope, elem, attrs) {
        elem.addClass('slides');
          for (var i = 0; i < scope.projects.length; i++) {
            var section = angular.element("<section>");
            var steps = scope.projects[i].pages;
            if(typeof steps == 'undefined'){
              var content = angular.element("<h4>").html(scope.projects[i].intro);
              section.append(content);
            }
            else if (steps.length == 1) {
              var content = angular.element("<h2>").html(steps[0].caption);
              section.append(content);
            } else {
              for (var j = 0; j < steps.length; j++) {
                var subSection = angular.element('<section class="reveal_section" data-background="'+ steps[j].image.url+'">');
                // var content = angular.element("<h1>").html(steps[j].caption);
                // subSection.append(caption);
                section.append(subSection);
              }
            }
            elem.append(section);
          }
          Reveal.initialize({
            loop: false,
            transition: Reveal.getQueryHash().transition || 'none'
          });

     
    }
  };
});