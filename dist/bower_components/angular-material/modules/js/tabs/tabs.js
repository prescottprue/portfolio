!function(){"use strict";angular.module("material.components.tabs",["material.core"])}(),function(){"use strict";function a(a){function b(b,d,e,f){function g(){var a=h.getSelectedItem(),e=!a||h.count()<2;if(d.css("display",e?"none":"block"),!e&&b.pagination&&b.pagination.tabData){var f=h.getSelectedIndex(),g=b.pagination.tabData.tabs[f]||{left:0,right:0,width:0},i=d.parent().prop("offsetWidth")-g.right,j=["md-transition-left","md-transition-right","md-no-transition"],k=c>f?0:f>c?1:2;d.removeClass(j.join(" ")).addClass(j[k]).css({left:g.left+1+"px",right:i+"px"}),c=f}}if(!f[0]){var h=f[1],i=a.debounce(g);h.inkBarElement=d,b.$on("$mdTabsPaginationChanged",i)}}var c=0;return{restrict:"E",require:["^?mdNoBar","^mdTabs"],link:b}}angular.module("material.components.tabs").directive("mdTabsInkBar",a),a.$inject=["$$rAF"]}(),function(){"use strict";function a(a,b,c,d,e,f){function g(g,i,j,k){function l(a,b){if(a){var c=r(a);w.active&&c!==w.page?(b&&b.element.blur(),s(c).then(function(){a.element.focus()})):a.element.focus()}}function m(a){var b=w.tabData,c=Math.max(0,Math.min(b.pages.length-1,w.page+a)),d=b.pages[c][a>0?"firstTabIndex":"lastTabIndex"],e=k.itemAt(d);l(e)}function n(){function a(){v.css("width","9999px"),angular.forEach(f.tabs,function(a){angular.element(a.element).css("margin-left",a.filler+"px")}),s(r(k.getSelectedItem()))}function b(){o(0),v.css("width",""),d.css("width",""),d.css("margin-left",""),w.page=null,w.active=!1}function c(){return j||g.$watch(function(){e(function(){i[0].offsetParent&&(angular.isFunction(j)&&j(),u(),j=null)},0,!1)})}if(i.prop("offsetParent")){var d=i.find("md-tab");b();var f=w.tabData=q(),h=w.active=f.pages.length>1;h&&a(),g.$evalAsync(function(){g.$broadcast("$mdTabsPaginationChanged")})}else var j=c()}function o(b){function c(b){b.target===v[0]&&(v.off(a.CSS.TRANSITIONEND,c),e.resolve())}if(k.pagingOffset===b)return d.when();var e=d.defer();return k.$$pagingOffset=b,v.css(a.CSS.TRANSFORM,"translate3d("+b+"px,0,0)"),v.on(a.CSS.TRANSITIONEND,c),e.promise}function p(){switch(g.stretchTabs){case"never":return!1;case"always":return!0;default:return f("sm")}}function q(a){function b(){var a=1===l.length?d:e,b=Math.min(Math.floor(a/j),t.length),c=Math.floor(a/b);return f.css("width",c+"px"),q(!0)}var c,d=i.parent().prop("offsetWidth"),e=d-h-1,f=angular.element(t),g=0,j=0,k=[],l=[];return f.css("max-width",""),angular.forEach(t,function(a,b){var f=Math.min(e,a.offsetWidth),h={element:a,left:g,width:f,right:g+f,filler:0};h.page=Math.ceil(h.right/(1===l.length&&b===t.length-1?d:e))-1,h.page>=l.length?(h.filler=e*h.page-h.left,h.right+=h.filler,h.left+=h.filler,c={left:h.left,firstTabIndex:b,lastTabIndex:b,tabs:[h]},l.push(c)):(c.lastTabIndex=b,c.tabs.push(h)),g=h.right,j=Math.max(j,f),k.push(h)}),f.css("max-width",e+"px"),!a&&p()?b():{width:g,max:j,tabs:k,pages:l,tabElements:t}}function r(a){var b=k.indexOf(a);if(-1===b)return 0;var c=w.tabData;return c?c.tabs[b].page:0}function s(a){if(a!==w.page){var b=w.tabData.pages.length-1;return 0>a&&(a=0),a>b&&(a=b),w.hasPrev=a>0,w.hasNext=b>a,w.page=a,g.$broadcast("$mdTabsPaginationChanged"),o(-w.tabData.pages[a].left)}}var t=i[0].getElementsByTagName("md-tab"),u=c.debounce(n),v=i.children(),w=g.pagination={page:-1,active:!1,clickNext:function(){m(1)},clickPrevious:function(){m(-1)}};g.$on("$mdTabsChanged",u),angular.element(b).on("resize",u),g.$on("$destroy",function(){angular.element(b).off("resize",u)}),g.$watch(function(){return k.tabToFocus},l)}var h=64;return{restrict:"A",require:"^mdTabs",link:g}}angular.module("material.components.tabs").directive("mdTabsPagination",a),a.$inject=["$mdConstant","$window","$$rAF","$$q","$timeout","$mdMedia"]}(),function(){"use strict";function a(a,b,c,d,e,f,g,h){function i(){return p(a.$parent)}function j(b,c){o.content.length&&(o.contentContainer.append(o.content),o.contentScope=a.$parent.$new(),b.append(o.contentContainer),d(o.contentContainer)(o.contentScope),c===!0&&h(function(){f.disconnectScope(o.contentScope)},0,!1))}function k(){o.hammertime.destroy(),e.leave(o.contentContainer).then(function(){o.contentScope&&o.contentScope.$destroy(),o.contentScope=null})}function l(a){o.contentContainer[a?"addClass":"removeClass"]("md-transition-rtl")}function m(c){f.reconnectScope(o.contentScope),o.hammertime.on("swipeleft swiperight",a.onSwipe),b.addClass("active"),b.attr("aria-selected",!0),b.attr("tabIndex",0),l(c),e.removeClass(o.contentContainer,"ng-hide"),a.onSelect()}function n(c){f.disconnectScope(o.contentScope),o.hammertime.off("swipeleft swiperight",a.onSwipe),b.removeClass("active"),b.attr("aria-selected",!1),b.attr("tabIndex",-1),l(c),e.addClass(o.contentContainer,"ng-hide"),a.onDeselect()}var o=this;o.contentContainer=angular.element('<div class="md-tab-content ng-hide">'),o.hammertime=new Hammer(o.contentContainer[0]),o.element=b,o.isDisabled=i,o.onAdd=j,o.onRemove=k,o.onSelect=m,o.onDeselect=n;var p=g(c.ngDisabled)}angular.module("material.components.tabs").controller("$mdTab",a),a.$inject=["$scope","$element","$attrs","$compile","$animate","$mdUtil","$parse","$timeout"]}(),function(){"use strict";function a(a,b,c,d,e){function f(f,g){var h=f.find("md-tab-label");h.length?h.remove():h=angular.isDefined(g.label)?angular.element("<md-tab-label>").html(g.label):angular.element("<md-tab-label>").append(f.contents().remove());var i=f.contents().remove();return function(f,g,j,k){function l(){var a=h.clone();g.append(a),b(a)(f.$parent),t.content=i.clone()}function m(){f.$apply(function(){u.select(t),u.focus(t)})}function n(a){a.keyCode==d.KEY_CODE.SPACE||a.keyCode==d.KEY_CODE.ENTER?(g.triggerHandler("click"),a.preventDefault()):a.keyCode===d.KEY_CODE.LEFT_ARROW?f.$evalAsync(function(){u.focus(u.previous(t))}):a.keyCode===d.KEY_CODE.RIGHT_ARROW&&f.$evalAsync(function(){u.focus(u.next(t))})}function o(a){f.$apply(function(){u.select("swipeleft"===a.type?u.next():u.previous())})}function p(){f.$watch("$parent.$index",function(a){u.move(t,a)})}function q(){function a(a){var b=u.getSelectedItem()===t;a&&!b?u.select(t):!a&&b&&u.deselect(t)}var b=f.$parent.$watch("!!("+j.mdActive+")",a);f.$on("$destroy",b)}function r(){function a(a){g.attr("aria-disabled",a);var b=u.getSelectedItem()===t;b&&a&&u.select(u.next()||u.previous())}f.$watch(t.isDisabled,a)}function s(){var a=j.id||"tab_"+c.nextUid();if(g.attr({id:a,role:"tab",tabIndex:-1}),i.length){var b="content_"+a;g.attr("aria-controls")||g.attr("aria-controls",b),t.contentContainer.attr({id:b,role:"tabpanel","aria-labelledby":a})}}var t=k[0],u=k[1];f.$watch(function(){return j.label},function(){e(function(){u.scope.$broadcast("$mdTabsChanged")},0,!1)}),l(),s();var v=a.attachTabBehavior(f,g,{colorElement:u.inkBarElement});u.add(t),f.$on("$destroy",function(){v(),u.remove(t)}),g.on("$destroy",function(){e(function(){u.scope.$broadcast("$mdTabsChanged")},0,!1)}),angular.isDefined(j.ngClick)||g.on("click",m),g.on("keydown",n),f.onSwipe=o,angular.isNumber(f.$parent.$index)&&p(),angular.isDefined(j.mdActive)&&q(),r()}}return{restrict:"E",require:["mdTab","^mdTabs"],controller:"$mdTab",scope:{onSelect:"&mdOnSelect",onDeselect:"&mdOnDeselect",label:"@"},compile:f}}angular.module("material.components.tabs").directive("mdTab",a),a.$inject=["$mdInkRipple","$compile","$mdUtil","$mdConstant","$timeout"]}(),function(){"use strict";function a(a,b,c){function d(){return r(a.selectedIndex)}function e(){return a.selectedIndex}function f(b,c){o.add(b,c),angular.isDefined(b.element.attr("md-active"))||-1!==a.selectedIndex&&angular.isNumber(a.selectedIndex)&&a.selectedIndex!==p.indexOf(b)?b.onAdd(p.contentArea,!0):(b.onAdd(p.contentArea,!1),p.select(b)),a.$broadcast("$mdTabsChanged")}function g(b,c){if(o.contains(b)&&!c){var e=d()===b,f=m()||l();k(b),o.remove(b),b.onRemove(),a.$broadcast("$mdTabsChanged"),e&&i(f)}}function h(b,c){var e=d()===b;o.remove(b),o.add(b,c),e&&i(b),a.$broadcast("$mdTabsChanged")}function i(b,c){!b||b.isSelected||b.isDisabled()||o.contains(b)&&(angular.isDefined(c)||(c=q(b)<a.selectedIndex),k(d(),c),a.selectedIndex=q(b),b.isSelected=!0,b.onSelect(c),a.$broadcast("$mdTabsChanged"))}function j(a){p.tabToFocus=a}function k(b,c){b&&b.isSelected&&o.contains(b)&&(a.selectedIndex=-1,b.isSelected=!1,b.onDeselect(c))}function l(a,b){return o.next(a||d(),b||n)}function m(a,b){return o.previous(a||d(),b||n)}function n(a){return a&&!a.isDisabled()}var o=c.iterator([],!1),p=this;p.$element=b,p.scope=a;var q=(p.contentArea=angular.element(b[0].querySelector(".md-tabs-content")),p.inRange=o.inRange,p.indexOf=o.indexOf),r=p.itemAt=o.itemAt;p.count=o.count,p.getSelectedItem=d,p.getSelectedIndex=e,p.add=f,p.remove=g,p.move=h,p.select=i,p.focus=j,p.deselect=k,p.next=l,p.previous=m,a.$on("$destroy",function(){k(d());for(var a=o.count()-1;a>=0;a--)g(o[a],!0)})}angular.module("material.components.tabs").controller("$mdTabs",a),a.$inject=["$scope","$element","$mdUtil","$timeout"]}(),function(){"use strict";function a(a){function b(b,c,d,e,f){function g(){c.attr("role","tablist")}function h(){b.$watch("selectedIndex",function(a,b){if(b!=a){var c=b>a;if(e.deselect(e.itemAt(b),c),e.inRange(a)){for(var d=e.itemAt(a);d&&d.isDisabled();)d=a>b?e.next(d):e.previous(d);e.select(d,c)}}})}b.stretchTabs=d.hasOwnProperty("mdStretchTabs")?d.mdStretchTabs||"always":"auto",a(c),g(),h(),f(b.$parent,function(a){angular.element(c[0].querySelector(".md-header-items")).append(a)})}return{restrict:"E",controller:"$mdTabs",require:"mdTabs",transclude:!0,scope:{selectedIndex:"=?mdSelected"},template:'<section class="md-header" ng-class="{\'md-paginating\': pagination.active}"><button class="md-paginator md-prev" ng-if="pagination.active && pagination.hasPrev" ng-click="pagination.clickPrevious()" aria-hidden="true"></button><div class="md-header-items-container" md-tabs-pagination><div class="md-header-items"><md-tabs-ink-bar></md-tabs-ink-bar></div></div><button class="md-paginator md-next" ng-if="pagination.active && pagination.hasNext" ng-click="pagination.clickNext()" aria-hidden="true"></button></section><section class="md-tabs-content"></section>',link:b}}angular.module("material.components.tabs").directive("mdTabs",a),a.$inject=["$mdTheming"]}();