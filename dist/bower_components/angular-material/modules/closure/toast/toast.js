goog.provide("ng.material.components.toast"),goog.require("ng.material.components.button"),goog.require("ng.material.core"),function(){"use strict";function a(){return{restrict:"E"}}function b(a){function b(a,b,d){function e(e,f,h){return c=h.content,f.addClass(h.position.split(" ").map(function(a){return"md-"+a}).join(" ")),h.parent.addClass(g(h.position)),h.onSwipe=function(b){f.addClass("md-"+b.type.replace("$md.","")),a(d.cancel)},f.on("$md.swipeleft $md.swiperight",h.onSwipe),b.enter(f,h.parent)}function f(a,c,d){return c.off("$md.swipeleft $md.swiperight",d.onSwipe),d.parent.removeClass(g(d.position)),b.leave(c)}function g(a){return"md-toast-open-"+(a.indexOf("top")>-1?"top":"bottom")}return{onShow:e,onRemove:f,position:"bottom left",themable:!0,hideDelay:3e3}}var c,d=a("$mdToast").setDefaults({methods:["position","hideDelay","capsule"],options:b}).addPreset("simple",{argOption:"content",methods:["content","action","highlightAction","theme"],options:["$mdToast","$mdTheming",function(a,b){var d={template:['<md-toast md-theme="{{ toast.theme }}" ng-class="{\'md-capsule\': toast.capsule}">',"<span flex>{{ toast.content }}</span>",'<md-button class="md-action" ng-if="toast.action" ng-click="toast.resolve()" ng-class="{\'md-highlight\': toast.highlightAction}">',"{{ toast.action }}","</md-button>","</md-toast>"].join(""),controller:["$scope",function(b){var d=this;b.$watch(function(){return c},function(){d.content=c}),this.resolve=function(){a.hide()}}],theme:b.defaultTheme(),controllerAs:"toast",bindToController:!0};return d}]}).addMethod("updateContent",function(a){c=a});return b.$inject=["$timeout","$animate","$mdToast"],d}angular.module("material.components.toast",["material.core","material.components.button"]).directive("mdToast",a).provider("$mdToast",b),b.$inject=["$$interimElementProvider"]}();