goog.provide("ng.material.components.bottomSheet"),goog.require("ng.material.components.backdrop"),goog.require("ng.material.core"),function(){"use strict";function a(){return{restrict:"E"}}function b(a){function b(a,b,e,f,g,h,i,j,k,l){function m(c,d,f){p=g('<md-backdrop class="md-opaque md-bottom-sheet-backdrop">')(c),p.on("click",function(){e(i.cancel)}),h.inherit(p,f.parent),a.enter(p,f.parent,null);var k=new o(d,f.parent);return f.bottomSheet=k,f.targetEvent&&angular.element(f.targetEvent.target).blur(),h.inherit(k.element,f.parent),f.disableParentScroll&&(f.lastOverflow=f.parent.css("overflow"),f.parent.css("overflow","hidden")),a.enter(k.element,f.parent).then(function(){var a=angular.element(d[0].querySelector("button")||d[0].querySelector("a")||d[0].querySelector("[ng-click]"));a.focus(),f.escapeToClose&&(f.rootElementKeyupCallback=function(a){a.keyCode===b.KEY_CODE.ESCAPE&&e(i.cancel)},j.on("keyup",f.rootElementKeyupCallback))})}function n(b,c,d){var e=d.bottomSheet;return a.leave(p),a.leave(e.element).then(function(){d.disableParentScroll&&(d.parent.css("overflow",d.lastOverflow),delete d.lastOverflow),e.cleanup(),d.targetEvent&&angular.element(d.targetEvent.target).focus()})}function o(a,f){function g(){a.css(b.CSS.TRANSITION_DURATION,"0ms")}function h(c){var e=c.pointer.distanceY;5>e&&(e=Math.max(-d,e/2)),a.css(b.CSS.TRANSFORM,"translate3d(0,"+(d+e)+"px,0)")}function j(d){if(d.pointer.distanceY>0&&(d.pointer.distanceY>20||Math.abs(d.pointer.velocityY)>c)){var f=a.prop("offsetHeight")-d.pointer.distanceY,g=Math.min(f/d.pointer.velocityY*.75,500);a.css(b.CSS.TRANSITION_DURATION,g+"ms"),e(i.cancel)}else a.css(b.CSS.TRANSITION_DURATION,""),a.css(b.CSS.TRANSFORM,"")}var k=l.register(f,"drag",{horizontal:!1});return f.on("$md.dragstart",g).on("$md.drag",h).on("$md.dragend",j),{element:a,cleanup:function(){k(),f.off("$md.dragstart",g).off("$md.drag",h).off("$md.dragend",j)}}}var p;return{themable:!0,targetEvent:null,onShow:m,onRemove:n,escapeToClose:!0,disableParentScroll:!0}}var c=.5,d=80;return b.$inject=["$animate","$mdConstant","$timeout","$$rAF","$compile","$mdTheming","$mdBottomSheet","$rootElement","$rootScope","$mdGesture"],a("$mdBottomSheet").setDefaults({methods:["disableParentScroll","escapeToClose","targetEvent"],options:b})}angular.module("material.components.bottomSheet",["material.core","material.components.backdrop"]).directive("mdBottomSheet",a).provider("$mdBottomSheet",b),b.$inject=["$$interimElementProvider"]}();