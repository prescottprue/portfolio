goog.provide("ng.material.components.select"),goog.require("ng.material.components.backdrop"),goog.require("ng.material.core"),function(){"use strict";function a(a,b,c,d,e){function f(d,f){var g=d.find("md-select-label").remove();g.length||(g=angular.element("<md-select-label><span></span></md-select-label>")),g.append('<span class="md-select-icon" aria-hidden="true"></span>'),g.addClass("md-select-label"),g.attr("id","select_label_"+b.nextUid()),d.find("md-content").length||d.append(angular.element("<md-content>").append(d.contents())),f.mdOnOpen&&d.find("md-content").prepend(angular.element("<md-progress-circular>").attr("md-mode","indeterminate").attr("ng-hide","$$loadingAsyncDone").wrap("<div>").parent());var h=angular.element('<div class="md-select-menu-container"><md-select-menu '+(angular.isDefined(f.multiple)?"multiple":"")+">"+d.html()+"</md-select-menu></div>");return d.empty().append(g),c(d),function(c,d,f,g){function i(){m=angular.element(h.clone());var a=m.find("md-select-menu");a.data("$ngModelController",p),a.data("$mdSelectController",o),n=c.$new(),m=e(m)(n)}function j(a){var b=[32,13,38,40];-1!=b.indexOf(a.keyCode)&&(a.preventDefault(),k(a))}function k(){c.$evalAsync(function(){l=!0,a.show({scope:n,preserveScope:!0,skipCompile:!0,element:m,target:d[0],hasBackdrop:!0,loadingAsync:f.mdOnOpen?c.$eval(f.mdOnOpen):!1}).then(function(){l=!1})})}var l,m,n,o=g[0],p=g[1],q=d.find("md-select-label"),r=0!==q.text().length;i();var s=p.$render;p.$render=function(){if(s(),m){var a=m.find("md-select-menu").controller("mdSelectMenu");o.setLabelText(a.selectedLabels())}},o.setLabelText=function(a){if(!r){o.setIsPlaceholder(!a);var b=a||f.placeholder,c=r?q:q.children().eq(0);c.text(b)}},o.setIsPlaceholder=function(a){a?q.addClass("md-placeholder"):q.removeClass("md-placeholder")},f.$observe("disabled",function(a){void 0!==a?(d.attr("tabindex",-1),d.off("click",k),d.off("keydown",j)):(d.attr("tabindex",0),d.on("click",k),d.on("keydown",j))}),void 0===f.disabled&&(d.on("click",k),d.on("keydown",j)),d.attr({role:"combobox",id:"select_"+b.nextUid(),"aria-haspopup":!0,"aria-expanded":"false","aria-labelledby":q.attr("id")}),c.$on("$destroy",function(){l?a.cancel().then(function(){m.remove()}):m.remove()})}}d.startSymbol(),d.endSymbol();return{restrict:"E",require:["mdSelect","ngModel"],compile:f,controller:function(){}}}function b(a,b,c){function d(a,d,e,f){function g(){d.attr({id:"select_menu_"+b.nextUid(),role:"listbox","aria-multiselectable":j.isMultiple?"true":"false"})}function h(a){(13==a.keyCode||32==a.keyCode)&&i(a)}function i(c){var d=b.getClosest(c.target,"md-option"),e=d&&angular.element(d).data("$mdOptionController");if(d&&e){var f=j.hashGetter(e.value),g=angular.isDefined(j.selected[f]);a.$apply(function(){j.isMultiple?g?j.deselect(f):j.select(f,e.value):g||(j.deselect(Object.keys(j.selected)[0]),j.select(f,e.value)),j.refreshViewValue()})}}var j=f[0],k=f[1];c(d),d.on("click",i),d.on("keypress",h),k&&j.init(k),g()}function e(b,c,d){function e(){var a=i.ngModel.$modelValue||i.ngModel.$viewValue;if(angular.isArray(a)){var b=Object.keys(i.selected),c=a.map(i.hashGetter),d=b.filter(function(a){return-1===c.indexOf(a)});d.forEach(i.deselect),c.forEach(function(b,c){i.select(b,a[c])})}}function g(){var a=i.ngModel.$viewValue||i.ngModel.$modelValue;Object.keys(i.selected).forEach(i.deselect),i.select(i.hashGetter(a),a)}var i=this;i.isMultiple=angular.isDefined(c.multiple),i.selected={},i.options={},i.init=function(d){function f(a,b){return angular.isArray(a||b||[])}if(i.ngModel=d,d.$options&&d.$options.trackBy){var j={},k=a(d.$options.trackBy);i.hashGetter=function(a,c){return j.$value=a,k(c||b,j)}}else i.hashGetter=function(a){return angular.isObject(a)?"$$object_"+(a.$$mdSelectId||(a.$$mdSelectId=++h)):a};i.isMultiple?(d.$validators["md-multiple"]=f,d.$render=e,b.$watchCollection(c.ngModel,function(a){f(a)&&e(a)})):d.$render=g},i.selectedLabels=function(){var a=f(d[0].querySelectorAll("md-option[selected]"));return a.length?a.map(function(a){return a.textContent}).join(", "):""},i.select=function(a,b){var c=i.options[a];c&&c.setSelected(!0),i.selected[a]=b},i.deselect=function(a){var b=i.options[a];b&&b.setSelected(!1),delete i.selected[a]},i.addOption=function(a,b){if(angular.isDefined(i.options[a]))throw new Error('Duplicate md-option values are not allowed in a select. Duplicate value "'+b.value+'" found.');i.options[a]=b,angular.isDefined(i.selected[a])&&(i.select(a,b.value),i.refreshViewValue())},i.removeOption=function(a){delete i.options[a]},i.refreshViewValue=function(){var a,b=[];for(var c in i.selected)b.push((a=i.options[c])?a.value:i.selected[c]);i.ngModel.$setViewValue(i.isMultiple?b:b[0])}}return e.$inject=["$scope","$attrs","$element"],{restrict:"E",require:["mdSelectMenu","?ngModel"],controller:e,link:{pre:d}}}function c(a,b){function c(a,b){return a.append(angular.element('<div class="md-text">').append(a.contents())),void 0===b.tabindex&&a.attr("tabindex",0),d}function d(c,d,e,f){function g(a,b){var d=j.hashGetter(b,c),e=j.hashGetter(a,c);i.hashKey=e,i.value=a,j.removeOption(d,i),j.addOption(e,i)}function h(){d.attr({role:"option","aria-selected":"false",id:"select_option_"+b.nextUid()})}var i=f[0],j=f[1];if(angular.isDefined(e.ngValue))c.$watch(e.ngValue,g);else{if(!angular.isDefined(e.value))throw new Error("Expected either ngValue or value attr");g(e.value)}a.attachButtonBehavior(c,d),h(),c.$on("$destroy",function(){j.removeOption(i.hashKey,i)})}function e(a){this.selected=!1,this.setSelected=function(b){b&&!this.selected?a.attr({selected:"selected","aria-selected":"true"}):!b&&this.selected&&(a.removeAttr("selected"),a.attr("aria-selected","false")),this.selected=b}}return e.$inject=["$element"],{restrict:"E",require:["mdOption","^^mdSelectMenu"],controller:e,compile:c}}function d(){function a(a,b){var c=a.find("label");c.length||(c=angular.element("<label>"),a.prepend(c)),b.label&&c.text(b.label)}return{restrict:"E",compile:a}}function e(a){function b(a,b,e,h,i,j){function k(c,d,g){function k(){g.selectEl.attr("aria-labelledby",g.target.attr("id")),g.target.attr("aria-owns",g.selectEl.attr("id")),g.target.attr("aria-expanded","true")}function l(){function e(a){var b=f(n),c=b.indexOf(g.focusedNode);-1===c?c=0:"next"===a&&c<b.length-1?c++:"prev"===a&&c>0&&c--;var d=g.focusedNode=b[c];d&&d.focus()}function i(){e("next")}function j(){e("prev")}function k(){g.restoreFocus=!0,c.$evalAsync(function(){a.hide(l.ngModel.$viewValue)})}if(!g.isRemoved){var l=g.selectEl.controller("mdSelectMenu")||{};d.addClass("md-clickable"),g.backdrop&&g.backdrop.on("click",function(b){b.preventDefault(),b.stopPropagation(),g.restoreFocus=!1,c.$apply(a.cancel)}),g.selectEl.on("keydown",function(d){switch(d.keyCode){case b.KEY_CODE.SPACE:case b.KEY_CODE.ENTER:var e=h.getClosest(d.target,"md-option");e&&(g.selectEl.triggerHandler({type:"click",target:e}),d.preventDefault());break;case b.KEY_CODE.TAB:case b.KEY_CODE.ESCAPE:d.preventDefault(),g.restoreFocus=!0,c.$apply(a.cancel)}}),g.selectEl.on("keydown",function(a){switch(a.keyCode){case b.KEY_CODE.UP_ARROW:return j();case b.KEY_CODE.DOWN_ARROW:return i()}}),l.isMultiple||(g.selectEl.on("click",k),g.selectEl.on("keydown",function(a){(32==a.keyCode||13==a.keyCode)&&k()}))}}if(!g.target)throw new Error('$mdSelect.show() expected a target element in options.target but got "'+g.target+'"!');angular.extend(g,{isRemoved:!1,target:angular.element(g.target),parent:angular.element(g.parent),selectEl:d.find("md-select-menu"),contentEl:d.find("md-content"),backdrop:g.hasBackdrop&&angular.element('<md-backdrop class="md-select-backdrop">')}),k(),d.removeClass("md-leave");var n=g.selectEl[0].getElementsByTagName("md-option");return g.loadingAsync&&g.loadingAsync.then&&g.loadingAsync.then(function(){c.$$loadingAsyncDone=!0,e(function(){e(function(){g.isRemoved||m(c,d,g)})})}),g.disableParentScroll&&(g.disableTarget=g.parent.find("md-content"),g.disableTarget.length||(g.disableTarget=g.parent),g.lastOverflow=g.disableTarget.css("overflow"),g.disableTarget.css("overflow","hidden")),j(l,75,!1),g.backdrop&&(i.inherit(g.backdrop,g.parent),g.parent.append(g.backdrop)),g.parent.append(d),e(function(){e(function(){g.isRemoved||m(c,d,g)})}),h.transitionEndPromise(g.selectEl)}function l(a,b,c){c.isRemoved=!0,b.addClass("md-leave").removeClass("md-clickable"),c.target.attr("aria-expanded","false"),c.disableParentScroll&&h.floatingScrollbars()&&(c.disableTarget.css("overflow",c.lastOverflow),delete c.lastOverflow,delete c.disableTarget);var d=c.selectEl.controller("mdSelect");return d&&d.setLabelText(c.selectEl.controller("mdSelectMenu").selectedLabels()),h.transitionEndPromise(b).then(function(){b.removeClass("md-active"),c.parent[0].removeChild(b[0]),c.backdrop&&c.backdrop.remove(),c.restoreFocus&&c.target.focus()})}function m(a,f,i){var j,k=f[0],l=i.target[0],m=i.parent[0],n=i.selectEl[0],o=i.contentEl[0],p=m.getBoundingClientRect(),q=h.clientRect(l,m),r=!1,s={left:m.scrollLeft+g,top:m.scrollTop+g,bottom:p.height+m.scrollTop-g,right:p.width-m.scrollLeft-g},t={top:q.top-s.top,left:q.left-s.left,right:s.right-(q.left+q.width),bottom:s.bottom-(q.top+q.height)},u=p.width-2*g,v=o.scrollHeight>o.offsetHeight,w=n.querySelector("md-option[selected]"),x=n.getElementsByTagName("md-option"),y=n.getElementsByTagName("md-optgroup");j=w?w:y.length?y[0]:x.length?x[0]:o.firstElementChild||o,o.offsetWidth>u&&(o.style["max-width"]=u+"px"),r&&(o.style["min-width"]=q.width+"px"),v&&n.classList.add("md-overflow");var z=n.getBoundingClientRect(),A=d(j);if(j){var B=window.getComputedStyle(j);A.paddingLeft=parseInt(B["padding-left"],10),A.paddingRight=parseInt(B["padding-right"],10)}var C=j;if("MD-OPTGROUP"===(C.tagName||"").toUpperCase()&&(C=x[0]||o.firstElementChild||o),C&&(i.focusedNode=C,C.focus()),v){var D=o.offsetHeight/2;o.scrollTop=A.top+A.height/2-D,t.top<D?o.scrollTop=Math.min(A.top,o.scrollTop+D-t.top):t.bottom<D&&(o.scrollTop=Math.max(A.top+A.height-z.height,o.scrollTop-D+t.bottom))}var E,F,G;r?(E=q.left,F=q.top+q.height,G="50% 0",F+z.height>s.bottom&&(F=q.top-z.height,G="50% 100%")):(E=q.left+A.left-A.paddingLeft,F=q.top+q.height/2-A.height/2-A.top+o.scrollTop,G=A.left+q.width/2+"px "+(A.top+A.height/2-o.scrollTop)+"px 0px",k.style["min-width"]=q.width+A.paddingLeft+A.paddingRight+"px"),k.style.left=c(s.left,E,s.right)+"px",k.style.top=c(s.top,F,s.bottom)+"px",n.style[b.CSS.TRANSFORM_ORIGIN]=G,n.style[b.CSS.TRANSFORM]="scale("+Math.min(q.width/z.width,1)+","+Math.min(q.height/z.height,1)+")",e(function(){f.addClass("md-active"),n.style[b.CSS.TRANSFORM]=""})}return{parent:"body",onShow:k,onRemove:l,hasBackdrop:!0,disableParentScroll:h.floatingScrollbars(),themable:!0}}function c(a,b,c){return Math.min(c,Math.max(b,a))}function d(a){return a?{left:a.offsetLeft,top:a.offsetTop,width:a.offsetWidth,height:a.offsetHeight}:{left:0,top:0,width:0,height:0}}return b.$inject=["$mdSelect","$mdConstant","$$rAF","$mdUtil","$mdTheming","$timeout"],a("$mdSelect").setDefaults({methods:["target"],options:b})}function f(a){for(var b=[],c=0;c<a.length;++c)b.push(a.item(c));return b}var g=8,h=0;angular.module("material.components.select",["material.core","material.components.backdrop"]).directive("mdSelect",a).directive("mdSelectMenu",b).directive("mdOption",c).directive("mdOptgroup",d).provider("$mdSelect",e),a.$inject=["$mdSelect","$mdUtil","$mdTheming","$interpolate","$compile","$parse"],b.$inject=["$parse","$mdUtil","$mdTheming"],c.$inject=["$mdInkRipple","$mdUtil"],e.$inject=["$$interimElementProvider"]}();