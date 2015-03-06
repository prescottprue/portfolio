goog.provide("ng.material.components.progressLinear"),goog.require("ng.material.core"),function(){"use strict";function a(a,c,d){function e(a){return a.attr("aria-valuemin",0),a.attr("aria-valuemax",100),a.attr("role","progressbar"),f}function f(e,f,h){d(f);var i=f[0].querySelector(".md-bar1").style,j=f[0].querySelector(".md-bar2").style,k=angular.element(f[0].querySelector(".md-container"));h.$observe("value",function(a){if("query"!=h.mdMode){var d=g(a);f.attr("aria-valuenow",d),j[c.CSS.TRANSFORM]=b[d]}}),h.$observe("mdBufferValue",function(a){i[c.CSS.TRANSFORM]=b[g(a)]}),a(function(){k.addClass("md-ready")})}function g(a){return a>100?100:0>a?0:Math.ceil(a||0)}return{restrict:"E",template:'<div class="md-container"><div class="md-dashed"></div><div class="md-bar md-bar1"></div><div class="md-bar md-bar2"></div></div>',compile:e}}angular.module("material.components.progressLinear",["material.core"]).directive("mdProgressLinear",a),a.$inject=["$$rAF","$mdConstant","$mdTheming"];var b=function(){function a(a){var b=a/100,c=(a-100)/2;return"translateX("+c.toString()+"%) scale("+b.toString()+", 1)"}for(var b=new Array(101),c=0;101>c;c++)b[c]=a(c);return b}()}();