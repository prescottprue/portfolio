!function(){"use strict";function a(a,b){return{restrict:"E",link:function(c,d){b(d),a(function(){var a=d[0].querySelector("md-content");a&&a.scrollHeight>a.clientHeight&&d.addClass("md-content-overflow")})}}}function b(a){function b(a){return{template:['<md-dialog aria-label="{{ dialog.ariaLabel }}">',"<md-content>","<h2>{{ dialog.title }}</h2>","<p>{{ dialog.content }}</p>","</md-content>",'<div class="md-actions">','<md-button ng-if="dialog.$type == \'confirm\'" ng-click="dialog.abort()">',"{{ dialog.cancel }}","</md-button>",'<md-button ng-click="dialog.hide()" class="md-primary">',"{{ dialog.ok }}","</md-button>","</div>","</md-dialog>"].join(""),controller:function(){this.hide=function(){a.hide(!0)},this.abort=function(){a.cancel()}},controllerAs:"dialog",bindToController:!0}}function c(a,b,c,d,e,f,g,h,i,j,k,l){function m(c,e,f){function g(){var a=e[0].querySelector(".dialog-close");if(!a){var b=e[0].querySelectorAll(".md-actions button");a=b[b.length-1]}return angular.element(a)}f.parent=angular.element(f.parent),f.popInTarget=angular.element((f.targetEvent||{}).target);var j=g();return o(e.find("md-dialog")),f.hasBackdrop&&(f.backdrop=angular.element('<md-backdrop class="md-dialog-backdrop md-opaque">'),i.inherit(f.backdrop,f.parent),d.enter(f.backdrop,f.parent)),f.disableParentScroll&&(f.oldOverflowStyle=f.parent.css("overflow"),f.parent.css("overflow","hidden")),p(e,f.parent,f.popInTarget&&f.popInTarget.length&&f.popInTarget).then(function(){f.escapeToClose&&(f.rootElementKeyupCallback=function(b){b.keyCode===h.KEY_CODE.ESCAPE&&a(l.cancel)},b.on("keyup",f.rootElementKeyupCallback)),f.clickOutsideToClose&&(f.dialogClickOutsideCallback=function(b){b.target===e[0]&&a(l.cancel)},e.on("click",f.dialogClickOutsideCallback)),j.focus()})}function n(a,c,e){return e.backdrop&&d.leave(e.backdrop),e.disableParentScroll&&(e.parent.css("overflow",e.oldOverflowStyle),f[0].removeEventListener("scroll",e.captureScroll,!0)),e.escapeToClose&&b.off("keyup",e.rootElementKeyupCallback),e.clickOutsideToClose&&c.off("click",e.dialogClickOutsideCallback),q(c,e.parent,e.popInTarget&&e.popInTarget.length&&e.popInTarget).then(function(){e.scope.$destroy(),c.remove(),e.popInTarget&&e.popInTarget.focus()})}function o(a){a.attr({role:"dialog"});var b=a.find("md-content");0===b.length&&(b=a),e.expectAsync(a,"aria-label",function(){var a=b.text().split(/\s+/);return a.length>3&&(a=a.slice(0,3).concat("...")),a.join(" ")})}function p(a,b,c){var d=a.find("md-dialog");return b.append(a),r(d,c),j(function(){d.addClass("transition-in").css(h.CSS.TRANSFORM,"")}),s(d)}function q(a,b,c){var d=a.find("md-dialog");return d.addClass("transition-out").removeClass("transition-in"),r(d,c),s(d)}function r(a,b){if(b){var c=b[0].getBoundingClientRect(),d=a[0].getBoundingClientRect(),e=Math.min(.5,c.width/d.width),f=Math.min(.5,c.height/d.height);a.css(h.CSS.TRANSFORM,"translate3d("+(-d.left+c.left+c.width/2-d.width/2)+"px,"+(-d.top+c.top+c.height/2-d.height/2)+"px,0) scale("+e+","+f+")")}}function s(a){function b(d){d.target===a[0]&&(a.off(h.CSS.TRANSITIONEND,b),c.resolve())}var c=k.defer();return a.on(h.CSS.TRANSITIONEND,b),c.promise}return{hasBackdrop:!0,isolateScope:!0,onShow:m,onRemove:n,clickOutsideToClose:!0,escapeToClose:!0,targetEvent:null,disableParentScroll:!0,transformTemplate:function(a){return'<div class="md-dialog-container">'+a+"</div>"}}}return b.$inject=["$mdDialog"],c.$inject=["$timeout","$rootElement","$compile","$animate","$mdAria","$document","$mdUtil","$mdConstant","$mdTheming","$$rAF","$q","$mdDialog"],a("$mdDialog").setDefaults({methods:["disableParentScroll","hasBackdrop","clickOutsideToClose","escapeToClose","targetEvent"],options:c}).addPreset("alert",{methods:["title","content","ariaLabel","ok"],options:b}).addPreset("confirm",{methods:["title","content","ariaLabel","ok","cancel"],options:b})}angular.module("material.components.dialog",["material.core","material.components.backdrop"]).directive("mdDialog",a).provider("$mdDialog",b),a.$inject=["$$rAF","$mdTheming"],b.$inject=["$$interimElementProvider"]}();