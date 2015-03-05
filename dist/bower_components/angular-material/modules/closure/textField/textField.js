goog.provide("ng.material.components.textField"),goog.require("ng.material.core"),function(){"use strict";function a(a,b,c,d){return{restrict:"E",replace:!0,scope:{fid:"@?mdFid",label:"@?",value:"=ngModel"},compile:function(e,f){return d.warn("<md-text-float> is deprecated. Please use `<md-input-container>` and `<input>`.More information at http://material.angularjs.org/#/api/material.components.input/directive/mdInputContainer"),angular.isUndefined(f.mdFid)&&(f.mdFid=b.nextUid()),{pre:function(a,b,d){var e=c(d.ngDisabled);a.isDisabled=function(){return e(a.$parent)},a.inputType=d.type||"text"},post:a}},template:'<md-input-group tabindex="-1"> <label for="{{fid}}" >{{label}}</label> <md-input id="{{fid}}" ng-disabled="isDisabled()" ng-model="value" type="{{inputType}}"></md-input></md-input-group>'}}function b(a){return{restrict:"CE",controller:["$element",function(b){a.warn("<md-input-group> is deprecated. Please use `<md-input-container>` and `<input>`.More information at http://material.angularjs.org/#/api/material.components.input/directive/mdInputContainer"),this.setFocused=function(a){b.toggleClass("md-input-focused",!!a)},this.setHasValue=function(a){b.toggleClass("md-input-has-value",a)}}]}}function c(a,b){return{restrict:"E",replace:!0,template:"<input >",require:["^?mdInputGroup","?ngModel"],link:function(a,c,d,e){function f(a){return a=angular.isUndefined(a)?c.val():a,angular.isDefined(a)&&null!==a&&""!==a.toString().trim()}if(e[0]){b.warn("<md-input> is deprecated. Please use `<md-input-container>` and `<input>`.More information at http://material.angularjs.org/#/api/material.components.input/directive/mdInputContainer");var g=e[0],h=e[1];a.$watch(a.isDisabled,function(a){c.attr("aria-disabled",!!a),c.attr("tabindex",!!a)}),c.attr("type",d.type||c.parent().attr("type")||"text"),h&&h.$formatters.push(function(a){return g.setHasValue(f(a)),a}),c.on("input",function(){g.setHasValue(f())}).on("focus",function(){g.setFocused(!0)}).on("blur",function(){g.setFocused(!1),g.setHasValue(f())}),a.$on("$destroy",function(){g.setFocused(!1),g.setHasValue(!1)})}}}}angular.module("material.components.textField",["material.core"]).directive("mdInputGroup",b).directive("mdInput",c).directive("mdTextFloat",a),a.$inject=["$mdTheming","$mdUtil","$parse","$log"],b.$inject=["$log"],c.$inject=["$mdUtil","$log"]}();