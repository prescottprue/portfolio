!function(){if(!window.location.search.match(/receiver/gi)){var a=Reveal.getConfig().multiplex,b=io.connect(a.url),c=function(c,d,e,f){if("undefined"==typeof f&&"remote"!==f){var g,h,i=Reveal.getIndices().f;"undefined"==typeof i&&(i=0),c.nextElementSibling&&"SECTION"==c.parentNode.nodeName?(g=d,h=e+1):(g=d+1,h=0);var j={indexh:d,indexv:e,indexf:i,nextindexh:g,nextindexv:h,secret:a.secret,socketId:a.id};b.emit("slidechanged",j)}};Reveal.addEventListener("slidechanged",function(a){c(a.currentSlide,a.indexh,a.indexv,a.origin)});var d=function(a){c(Reveal.getCurrentSlide(),Reveal.getIndices().h,Reveal.getIndices().v,a.origin)};Reveal.addEventListener("fragmentshown",d),Reveal.addEventListener("fragmenthidden",d)}}();