goog.provide("ng.material.components.tabs"),goog.require("ng.material.components.icon"),goog.require("ng.material.core"),function(){"use strict";angular.module("material.components.tabs",["material.core","material.components.icon"])}(),function(){"use strict";function a(a){function b(b,d,e,f){function g(){var a=i.getSelectedItem(),e=!a||i.count()<2||h;if(d.css("display",e?"none":"block"),!e&&b.pagination&&b.pagination.tabData){var f=i.getSelectedIndex(),g=b.pagination.tabData.tabs[f]||{left:0,right:0,width:0},j=d.parent().prop("offsetWidth")-g.right,k=["md-transition-left","md-transition-right","md-no-transition"],l=c>f?0:f>c?1:2;d.removeClass(k.join(" ")).addClass(k[l]).css({left:g.left+"px",right:j+"px"}),c=f}}var h=!!f[0],i=f[1],j=a.throttle(g);i.inkBarElement=d,b.$on("$mdTabsPaginationChanged",j)}var c=0;return{restrict:"E",require:["^?mdNoBar","^mdTabs"],link:b}}angular.module("material.components.tabs").directive("mdTabsInkBar",a),a.$inject=["$$rAF"]}(),function(){"use strict";function a(a,b,c,d,e,f){function g(g,i,j,k){function l(a,b){if(a){var c=r(a);x.active&&c!==x.page?(b&&b.element.blur(),s(c).then(function(){w=!1,a.element.focus()})):a.element.focus()}}function m(a){var b=x.tabData,c=Math.max(0,Math.min(b.pages.length-1,x.page+a)),d=b.pages[c][a>0?"firstTabIndex":"lastTabIndex"],e=k.itemAt(d);w=!0,l(e)}function n(){function a(){v.css("width","9999px"),angular.forEach(f.tabs,function(a){angular.element(a.element).css("margin-left",a.filler+"px")}),s(r(k.getSelectedItem()))}function b(){o(0),v.css("width",""),d.css("width",""),d.css("margin-left",""),x.page=null,x.active=!1}function c(){return j||g.$watch(function(){e(function(){i[0].offsetParent&&(angular.isFunction(j)&&j(),u(),j=null)},0,!1)})}if(i.prop("offsetParent")){var d=i.find("md-tab");b();var f=x.tabData=q(),h=x.active=f.pages.length>1;h&&a(),g.$evalAsync(function(){g.$broadcast("$mdTabsPaginationChanged")})}else var j=c()}function o(b){function c(b){b.target===v[0]&&(v.off(a.CSS.TRANSITIONEND,c),e.resolve())}if(k.pagingOffset===b)return d.when();var e=d.defer();return k.$$pagingOffset=b,v.css(a.CSS.TRANSFORM,"translate3d("+b+"px,0,0)"),v.on(a.CSS.TRANSITIONEND,c),e.promise}function p(){switch(g.stretchTabs){case"never":return!1;case"always":return!0;default:return f("sm")}}function q(a){function b(){var a=1===l.length?d:e,b=Math.min(Math.floor(a/j),t.length),c=Math.floor(a/b);return f.css("width",c+"px"),q(!0)}var c,d=i.parent().prop("offsetWidth"),e=d-h-1,f=angular.element(t),g=0,j=0,k=[],l=[];return f.css("max-width",""),angular.forEach(t,function(a,b){var f=Math.min(e,a.offsetWidth),h={element:a,left:g,width:f,right:g+f,filler:0};h.page=Math.ceil(h.right/(1===l.length&&b===t.length-1?d:e))-1,h.page>=l.length?(h.filler=e*h.page-h.left,h.right+=h.filler,h.left+=h.filler,c={left:h.left,firstTabIndex:b,lastTabIndex:b,tabs:[h]},l.push(c)):(c.lastTabIndex=b,c.tabs.push(h)),g=h.right,j=Math.max(j,f),k.push(h)}),f.css("max-width",e+"px"),!a&&p()?b():{width:g,max:j,tabs:k,pages:l,tabElements:t}}function r(a){var b=k.indexOf(a);if(-1===b)return 0;var c=x.tabData;return c?c.tabs[b].page:0}function s(a){if(a!==x.page){var b=x.tabData.pages.length-1;return 0>a&&(a=0),a>b&&(a=b),x.hasPrev=a>0,x.hasNext=b>a,x.page=a,g.$broadcast("$mdTabsPaginationChanged"),o(-x.tabData.pages[a].left)}}var t=i[0].getElementsByTagName("md-tab"),u=c.throttle(n),v=i.children(),w=!1,x=g.pagination={page:-1,active:!1,clickNext:function(){w||m(1)},clickPrevious:function(){w||m(-1)}};g.$on("$mdTabsChanged",u),angular.element(b).on("resize",u),g.$on("$destroy",function(){angular.element(b).off("resize",u)}),g.$watch(function(){return k.tabToFocus},l)}var h=64;return{restrict:"A",require:"^mdTabs",link:g}}angular.module("material.components.tabs").directive("mdTabsPagination",a),a.$inject=["$mdConstant","$window","$$rAF","$$q","$timeout","$mdMedia"]}(),function(){"use strict";function a(a,b,c,d,e,f,g,h){function i(){return r(a.$parent)}function j(b,c){p.content.length&&(p.contentContainer.append(p.content),p.contentScope=a.$parent.$new(),b.append(p.contentContainer),d(p.contentContainer)(p.contentScope),c===!0&&h(function(){f.disconnectScope(p.contentScope)},0,!1))}function k(){e.leave(p.contentContainer).then(function(){p.contentScope&&p.contentScope.$destroy(),p.contentScope=null})}function l(a){p.contentContainer[a?"addClass":"removeClass"]("md-transition-rtl")}function m(c){f.reconnectScope(p.contentScope),b.addClass("active").attr({"aria-selected":!0,tabIndex:0}).on("$md.swipeleft $md.swiperight",o),l(c),e.removeClass(p.contentContainer,"ng-hide"),a.onSelect()}function n(c){f.disconnectScope(p.contentScope),b.removeClass("active").attr({"aria-selected":!1,tabIndex:-1}).off("$md.swipeleft $md.swiperight",o),l(c),e.addClass(p.contentContainer,"ng-hide"),a.onDeselect()}function o(b){a.$apply(function(){q.select(/left/.test(b.type)?q.next():q.previous())})}var p=this,q=b.controller("mdTabs");p.contentContainer=angular.element('<div class="md-tab-content ng-hide">'),p.element=b,p.isDisabled=i,p.onAdd=j,p.onRemove=k,p.onSelect=m,p.onDeselect=n;var r=g(c.ngDisabled)}angular.module("material.components.tabs").controller("$mdTab",a),a.$inject=["$scope","$element","$attrs","$compile","$animate","$mdUtil","$parse","$timeout"]}(),function(){"use strict";function a(a,b,c,d,e){function f(f,g){var h=f.find("md-tab-label");h.length?h.remove():h=angular.isDefined(g.label)?angular.element("<md-tab-label>").html(g.label):angular.element("<md-tab-label>").append(f.contents().remove());var i=f.contents().remove();return function(f,g,j,k){function l(){var a=h.clone();g.append(a),b(a)(f.$parent),s.content=i.clone()}function m(){f.$apply(function(){t.select(s),t.focus(s)})}function n(a){a.keyCode==d.KEY_CODE.SPACE||a.keyCode==d.KEY_CODE.ENTER?(g.triggerHandler("click"),a.preventDefault()):a.keyCode===d.KEY_CODE.LEFT_ARROW?f.$evalAsync(function(){t.focus(t.previous(s))}):a.keyCode===d.KEY_CODE.RIGHT_ARROW&&f.$evalAsync(function(){t.focus(t.next(s))})}function o(){f.$watch("$parent.$index",function(a){t.move(s,a)})}function p(){function a(a){var b=t.getSelectedItem()===s;a&&!b?t.select(s):!a&&b&&t.deselect(s)}var b=f.$parent.$watch("!!("+j.mdActive+")",a);f.$on("$destroy",b)}function q(){function a(a){g.attr("aria-disabled",a);var b=t.getSelectedItem()===s;b&&a&&t.select(t.next()||t.previous())}f.$watch(s.isDisabled,a)}function r(){var a=j.id||"tab_"+c.nextUid();if(g.attr({id:a,role:"tab",tabIndex:-1}),i.length){var b="content_"+a;g.attr("aria-controls")||g.attr("aria-controls",b),s.contentContainer.attr({id:b,role:"tabpanel","aria-labelledby":a})}}var s=k[0],t=k[1];e(g.addClass.bind(g,"md-tab-themed"),0,!1),f.$watch(function(){return j.label},function(){e(function(){t.scope.$broadcast("$mdTabsChanged")},0,!1)}),l(),r(),a.attachTabBehavior(f,g,{colorElement:t.inkBarElement}),t.add(s),f.$on("$destroy",function(){t.remove(s)}),g.on("$destroy",function(){e(function(){t.scope.$broadcast("$mdTabsChanged")},0,!1)}),angular.isDefined(j.ngClick)||g.on("click",m),g.on("keydown",n),angular.isNumber(f.$parent.$index)&&o(),angular.isDefined(j.mdActive)&&p(),q()}}return{restrict:"E",require:["mdTab","^mdTabs"],controller:"$mdTab",scope:{onSelect:"&mdOnSelect",onDeselect:"&mdOnDeselect",label:"@"},compile:f}}angular.module("material.components.tabs").directive("mdTab",a),a.$inject=["$mdInkRipple","$compile","$mdUtil","$mdConstant","$timeout"]}(),function(){"use strict";function a(a,b,c){function d(){return r(a.selectedIndex)}function e(){return a.selectedIndex}function f(b,c){o.add(b,c),angular.isDefined(b.element.attr("md-active"))||-1!==a.selectedIndex&&angular.isNumber(a.selectedIndex)&&a.selectedIndex!==p.indexOf(b)?b.onAdd(p.contentArea,!0):(b.onAdd(p.contentArea,!1),p.select(b)),a.$broadcast("$mdTabsChanged")}function g(b,c){if(o.contains(b)&&!c){var e=d()===b,f=m()||l();k(b),o.remove(b),b.onRemove(),a.$broadcast("$mdTabsChanged"),e&&i(f)}}function h(b,c){var e=d()===b;o.remove(b),o.add(b,c),e&&i(b),a.$broadcast("$mdTabsChanged")}function i(b,c){!b||b.isSelected||b.isDisabled()||o.contains(b)&&(angular.isDefined(c)||(c=q(b)<a.selectedIndex),k(d(),c),a.selectedIndex=q(b),b.isSelected=!0,b.onSelect(c),a.$broadcast("$mdTabsChanged"))}function j(a){p.tabToFocus=a}function k(b,c){b&&b.isSelected&&o.contains(b)&&(a.selectedIndex=-1,b.isSelected=!1,b.onDeselect(c))}function l(a,b){return o.next(a||d(),b||n)}function m(a,b){return o.previous(a||d(),b||n)}function n(a){return a&&!a.isDisabled()}var o=c.iterator([],!1),p=this;p.$element=b,p.scope=a;var q=(p.contentArea=angular.element(b[0].querySelector(".md-tabs-content")),p.inRange=o.inRange,p.indexOf=o.indexOf),r=p.itemAt=o.itemAt;p.count=o.count,p.getSelectedItem=d,p.getSelectedIndex=e,p.add=f,p.remove=g,p.move=h,p.select=i,p.focus=j,p.deselect=k,p.next=l,p.previous=m,a.$on("$destroy",function(){k(d());for(var a=o.count()-1;a>=0;a--)g(o[a],!0)})}angular.module("material.components.tabs").controller("$mdTabs",a),a.$inject=["$scope","$element","$mdUtil","$timeout"]}(),function(){"use strict";function a(a){function b(b,c,d,e,f){function g(){c.attr("role","tablist")}function h(){b.$watch("selectedIndex",function(a,b){if(b!=a){var c=b>a;if(e.deselect(e.itemAt(b),c),e.inRange(a)){for(var d=e.itemAt(a);d&&d.isDisabled();)d=a>b?e.next(d):e.previous(d);e.select(d,c)}}})}b.stretchTabs=d.hasOwnProperty("mdStretchTabs")?d.mdStretchTabs||"always":"auto",a(c),g(),h(),f(b.$parent,function(a){angular.element(c[0].querySelector(".md-header-items")).append(a)})}return{restrict:"E",controller:"$mdTabs",require:"mdTabs",transclude:!0,scope:{selectedIndex:"=?mdSelected"},template:'<section class="md-header" ng-class="{\'md-paginating\': pagination.active}"><button class="md-paginator md-prev" ng-if="pagination.active && pagination.hasPrev" ng-click="pagination.clickPrevious()" aria-hidden="true"><md-icon md-svg-icon="tabs-arrow"></md-icon></button><div class="md-header-items-container" md-tabs-pagination><div class="md-header-items"><md-tabs-ink-bar></md-tabs-ink-bar></div></div><button class="md-paginator md-next" ng-if="pagination.active && pagination.hasNext" ng-click="pagination.clickNext()" aria-hidden="true"><md-icon md-svg-icon="tabs-arrow"></md-icon></button></section><section class="md-tabs-content"></section>',link:b}}angular.module("material.components.tabs").directive("mdTabs",a),a.$inject=["$mdTheming"]}();