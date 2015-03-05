!function(a,b,c){"use strict";b.module("ngAnimate",["ng"]).directive("ngAnimateChildren",function(){var a="$$ngAnimateChildren";return function(c,d,e){var f=e.ngAnimateChildren;b.isString(f)&&0===f.length?d.data(a,!0):c.$watch(f,function(b){d.data(a,!!b)})}}).factory("$$animateReflow",["$$rAF","$document",function(a,b){var c=b[0].body;return function(b){return a(function(){c.offsetWidth+1;b()})}}]).config(["$provide","$animateProvider",function(d,e){function f(a){for(var b=0;b<a.length;b++){var c=a[b];if(c.nodeType==q)return c}}function g(a){return a&&b.element(a)}function h(a){return b.element(f(a))}function i(a,b){return f(a)==f(b)}var j,k=b.noop,l=b.forEach,m=e.$$selectors,n=b.isArray,o=b.isString,p=b.isObject,q=1,r="$$ngAnimateState",s="$$ngAnimateChildren",t="ng-animate",u={running:!0};d.decorator("$animate",["$delegate","$$q","$injector","$sniffer","$rootElement","$$asyncCallback","$rootScope","$document","$templateRequest","$$jqLite",function(a,c,d,q,v,w,x,y,z,A){function B(a,b){var c=a.data(r)||{};return b&&(c.running=!0,c.structural=!0,a.data(r,c)),c.disabled||c.running&&c.structural}function C(a){var b,d=c.defer();return d.promise.$$cancelFn=function(){b&&b()},x.$$postDigest(function(){b=a(function(){d.resolve()})}),d.promise}function D(a){return p(a)?(a.tempClasses&&o(a.tempClasses)&&(a.tempClasses=a.tempClasses.split(/\s+/)),a):void 0}function E(a,b,c){c=c||{};var d={};l(c,function(a,b){l(b.split(" "),function(b){d[b]=a})});var e=Object.create(null);l((a.attr("class")||"").split(/\s+/),function(a){e[a]=!0});var f=[],g=[];return l(b&&b.classes||[],function(a,b){var c=e[b],h=d[b]||{};a===!1?(c||"addClass"==h.event)&&g.push(b):a===!0&&(c&&"removeClass"!=h.event||f.push(b))}),f.length+g.length>0&&[f.join(" "),g.join(" ")]}function F(a){if(a){var b=[],c={},e=a.substr(1).split(".");(q.transitions||q.animations)&&b.push(d.get(m[""]));for(var f=0;f<e.length;f++){var g=e[f],h=m[g];h&&!c[g]&&(b.push(d.get(h)),c[g]=!0)}return b}}function G(a,c,d,e){function f(a,b){var c=a[b],d=a["before"+b.charAt(0).toUpperCase()+b.substr(1)];return c||d?("leave"==b&&(d=c,c=null),w.push({event:b,fn:c}),t.push({event:b,fn:d}),!0):void 0}function g(b,c,f){function g(a){if(c){if((c[a]||k)(),++m<h.length)return;c=null}f()}var h=[];l(b,function(a){a.fn&&h.push(a)});var m=0;l(h,function(b,f){var h=function(){g(f)};switch(b.event){case"setClass":c.push(b.fn(a,i,j,h,e));break;case"animate":c.push(b.fn(a,d,e.from,e.to,h));break;case"addClass":c.push(b.fn(a,i||d,h,e));break;case"removeClass":c.push(b.fn(a,j||d,h,e));break;default:c.push(b.fn(a,h,e))}}),c&&0===c.length&&f()}var h=a[0];if(h){e&&(e.to=e.to||{},e.from=e.from||{});var i,j;n(d)&&(i=d[0],j=d[1],i?j?d=i+" "+j:(d=i,c="addClass"):(d=j,c="removeClass"));var m="setClass"==c,o=m||"addClass"==c||"removeClass"==c||"animate"==c,p=a.attr("class"),q=p+" "+d;if(O(q)){var r=k,s=[],t=[],u=k,v=[],w=[],x=(" "+q).replace(/\s+/g,".");return l(F(x),function(a){var b=f(a,c);!b&&m&&(f(a,"addClass"),f(a,"removeClass"))}),{node:h,event:c,className:d,isClassBased:o,isSetClassOperation:m,applyStyles:function(){e&&a.css(b.extend(e.from||{},e.to||{}))},before:function(a){r=a,g(t,s,function(){r=k,a()})},after:function(a){u=a,g(w,v,function(){u=k,a()})},cancel:function(){s&&(l(s,function(a){(a||k)(!0)}),r(!0)),v&&(l(v,function(a){(a||k)(!0)}),u(!0))}}}}}function H(a,c,d,e,f,g,h,i){function m(b){var e="$animate:"+b;x&&x[e]&&x[e].length>0&&w(function(){d.triggerHandler(e,{event:a,className:c})})}function n(){m("before")}function o(){m("after")}function p(){m("close"),i()}function q(){q.hasBeenRun||(q.hasBeenRun=!0,g())}function s(){if(!s.hasBeenRun){v&&v.applyStyles(),s.hasBeenRun=!0,h&&h.tempClasses&&l(h.tempClasses,function(a){j.removeClass(d,a)});var b=d.data(r);b&&(v&&v.isClassBased?J(d,c):(w(function(){var b=d.data(r)||{};H==b.index&&J(d,c,a)}),d.data(r,b))),p()}}var u=k,v=G(d,a,c,h);if(!v)return q(),n(),o(),s(),u;a=v.event,c=v.className;var x=b.element._data(v.node);if(x=x&&x.events,e||(e=f?f.parent():d.parent()),K(d,e))return q(),n(),o(),s(),u;var y=d.data(r)||{},z=y.active||{},A=y.totalActive||0,B=y.last,C=!1;if(A>0){var D=[];if(v.isClassBased){if("setClass"==B.event)D.push(B),J(d,c);else if(z[c]){var E=z[c];E.event==a?C=!0:(D.push(E),J(d,c))}}else if("leave"==a&&z["ng-leave"])C=!0;else{for(var F in z)D.push(z[F]);y={},J(d,!0)}D.length>0&&l(D,function(a){a.cancel()})}if(!v.isClassBased||v.isSetClassOperation||"animate"==a||C||(C="addClass"==a==d.hasClass(c)),C)return q(),n(),o(),p(),u;z=y.active||{},A=y.totalActive||0,"leave"==a&&d.one("$destroy",function(){var a=b.element(this),c=a.data(r);if(c){var d=c.active["ng-leave"];d&&(d.cancel(),J(a,"ng-leave"))}}),j.addClass(d,t),h&&h.tempClasses&&l(h.tempClasses,function(a){j.addClass(d,a)});var H=M++;return A++,z[c]=v,d.data(r,{last:v,active:z,index:H,totalActive:A}),n(),v.before(function(b){var e=d.data(r);b=b||!e||!e.active[c]||v.isClassBased&&e.active[c].event!=a,q(),b===!0?s():(o(),v.after(s))}),v.cancel}function I(a){var c=f(a);if(c){var d=b.isFunction(c.getElementsByClassName)?c.getElementsByClassName(t):c.querySelectorAll("."+t);l(d,function(a){a=b.element(a);var c=a.data(r);c&&c.active&&l(c.active,function(a){a.cancel()})})}}function J(a,b){if(i(a,v))u.disabled||(u.running=!1,u.structural=!1);else if(b){var c=a.data(r)||{},d=b===!0;!d&&c.active&&c.active[b]&&(c.totalActive--,delete c.active[b]),(d||!c.totalActive)&&(j.removeClass(a,t),a.removeData(r))}}function K(a,c){if(u.disabled)return!0;if(i(a,v))return u.running;var d,e,f;do{if(0===c.length)break;var g=i(c,v),h=g?u:c.data(r)||{};if(h.disabled)return!0;if(g&&(f=!0),d!==!1){var j=c.data(s);b.isDefined(j)&&(d=j)}e=e||h.running||h.last&&!h.last.isClassBased}while(c=c.parent());return!f||!d&&e}j=A,v.data(r,u);var L=x.$watch(function(){return z.totalPendingRequests},function(a){0===a&&(L(),x.$$postDigest(function(){x.$$postDigest(function(){u.running=!1})}))}),M=0,N=e.classNameFilter(),O=N?function(a){return N.test(a)}:function(){return!0};return{animate:function(a,b,c,d,e){return d=d||"ng-inline-animate",e=D(e)||{},e.from=c?b:null,e.to=c?c:b,C(function(b){return H("animate",d,h(a),null,null,k,e,b)})},enter:function(c,d,e,f){return f=D(f),c=b.element(c),d=g(d),e=g(e),B(c,!0),a.enter(c,d,e),C(function(a){return H("enter","ng-enter",h(c),d,e,k,f,a)})},leave:function(c,d){return d=D(d),c=b.element(c),I(c),B(c,!0),C(function(b){return H("leave","ng-leave",h(c),null,null,function(){a.leave(c)},d,b)})},move:function(c,d,e,f){return f=D(f),c=b.element(c),d=g(d),e=g(e),I(c),B(c,!0),a.move(c,d,e),C(function(a){return H("move","ng-move",h(c),d,e,k,f,a)})},addClass:function(a,b,c){return this.setClass(a,b,[],c)},removeClass:function(a,b,c){return this.setClass(a,[],b,c)},setClass:function(c,d,e,g){g=D(g);var i="$$animateClasses";if(c=b.element(c),c=h(c),B(c))return a.$$setClassImmediately(c,d,e,g);var j,k=c.data(i),m=!!k;return k||(k={},k.classes={}),j=k.classes,d=n(d)?d:d.split(" "),l(d,function(a){a&&a.length&&(j[a]=!0)}),e=n(e)?e:e.split(" "),l(e,function(a){a&&a.length&&(j[a]=!1)}),m?(g&&k.options&&(k.options=b.extend(k.options||{},g)),k.promise):(c.data(i,k={classes:j,options:g}),k.promise=C(function(b){var d=c.parent(),e=f(c),g=e.parentNode;if(!g||g.$$NG_REMOVED||e.$$NG_REMOVED)return void b();var h=c.data(i);c.removeData(i);var j=c.data(r)||{},k=E(c,h,j.active);return k?H("setClass",k,c,d,null,function(){k[0]&&a.$$addClassImmediately(c,k[0]),k[1]&&a.$$removeClassImmediately(c,k[1])},h.options,b):b()}))},cancel:function(a){a.$$cancelFn()},enabled:function(a,b){switch(arguments.length){case 2:if(a)J(b);else{var c=b.data(r)||{};c.disabled=!0,b.data(r,c)}break;case 1:u.disabled=!a;break;default:a=!u.disabled}return!!a}}}]),e.register("",["$window","$sniffer","$timeout","$$animateReflow",function(d,e,g,h){function i(){J||(J=h(function(){W=[],J=null,U={}}))}function m(a,b){J&&J(),W.push(b),J=h(function(){l(W,function(a){a()}),W=[],J=null,U={}})}function p(a,c){var d=f(a);a=b.element(d),Z.push(a);var e=Date.now()+c;Y>=e||(g.cancel(X),Y=e,X=g(function(){r(Z),Z=[]},c,!1))}function r(a){l(a,function(a){var b=a.data(Q);b&&l(b.closeAnimationFns,function(a){a()})})}function s(a,b){var c=b?U[b]:null;if(!c){var e=0,f=0,g=0,h=0;l(a,function(a){if(a.nodeType==q){var b=d.getComputedStyle(a)||{},c=b[E+K];e=Math.max(t(c),e);var i=b[E+M];f=Math.max(t(i),f);{b[G+M]}h=Math.max(t(b[G+M]),h);var j=t(b[G+K]);j>0&&(j*=parseInt(b[G+N],10)||1),g=Math.max(j,g)}}),c={total:0,transitionDelay:f,transitionDuration:e,animationDelay:h,animationDuration:g},b&&(U[b]=c)}return c}function t(a){var b=0,c=o(a)?a.split(/\s*,\s*/):[];return l(c,function(a){b=Math.max(parseFloat(a)||0,b)}),b}function u(a){var b=a.parent(),c=b.data(P);return c||(b.data(P,++V),c=V),c+"-"+f(a).getAttribute("class")}function v(a,b,c,d){var e=["ng-enter","ng-leave","ng-move"].indexOf(c)>=0,g=u(b),h=g+" "+c,i=U[h]?++U[h].total:0,k={};if(i>0){var l=c+"-stagger",m=g+" "+l,n=!U[m];n&&j.addClass(b,l),k=s(b,m),n&&j.removeClass(b,l)}j.addClass(b,c);var o=b.data(Q)||{},p=s(b,h),q=p.transitionDuration,r=p.animationDuration;if(e&&0===q&&0===r)return j.removeClass(b,c),!1;var t=d||e&&q>0,v=r>0&&k.animationDelay>0&&0===k.animationDuration,w=o.closeAnimationFns||[];b.data(Q,{stagger:k,cacheKey:h,running:o.running||0,itemIndex:i,blockTransition:t,closeAnimationFns:w});var z=f(b);return t&&(x(z,!0),d&&b.css(d)),v&&y(z,!0),!0}function w(a,b,c,d,e){function h(){b.off(M,i),j.removeClass(b,n),j.removeClass(b,o),K&&g.cancel(K),C(b,c);var a=f(b);for(var d in r)a.style.removeProperty(r[d])}function i(a){a.stopPropagation();var b=a.originalEvent||a,c=b.$manualTimeStamp||b.timeStamp||Date.now(),e=parseFloat(b.elapsedTime.toFixed(R));Math.max(c-L,0)>=G&&e>=D&&d()}var k=f(b),m=b.data(Q);if(-1==k.getAttribute("class").indexOf(c)||!m)return void d();var n="",o="";l(c.split(" "),function(a,b){var c=(b>0?" ":"")+a;n+=c+"-active",o+=c+"-pending"});var q="",r=[],t=m.itemIndex,u=m.stagger,v=0;if(t>0){var w=0;u.transitionDelay>0&&0===u.transitionDuration&&(w=u.transitionDelay*t);var z=0;u.animationDelay>0&&0===u.animationDuration&&(z=u.animationDelay*t,r.push(I+"animation-play-state")),v=Math.round(100*Math.max(w,z))/100}v||(j.addClass(b,n),m.blockTransition&&x(k,!1));var A=m.cacheKey+" "+n,B=s(b,A),D=Math.max(B.transitionDuration,B.animationDuration);if(0===D)return j.removeClass(b,n),C(b,c),void d();!v&&e&&Object.keys(e).length>0&&(B.transitionDuration||(b.css("transition",B.animationDuration+"s linear all"),r.push("transition")),b.css(e));var E=Math.max(B.transitionDelay,B.animationDelay),G=E*T;if(r.length>0){var J=k.getAttribute("style")||"";";"!==J.charAt(J.length-1)&&(J+=";"),k.setAttribute("style",J+" "+q)}var K,L=Date.now(),M=H+" "+F,N=(E+D)*S,O=(v+N)*T;return v>0&&(j.addClass(b,o),K=g(function(){K=null,B.transitionDuration>0&&x(k,!1),B.animationDuration>0&&y(k,!1),j.addClass(b,n),j.removeClass(b,o),e&&(0===B.transitionDuration&&b.css("transition",B.animationDuration+"s linear all"),b.css(e),r.push("transition"))},v*T,!1)),b.on(M,i),m.closeAnimationFns.push(function(){h(),d()}),m.running++,p(b,O),h}function x(a,b){a.style[E+L]=b?"none":""}function y(a,b){a.style[G+O]=b?"paused":""}function z(a,b,c,d){return v(a,b,c,d)?function(a){a&&C(b,c)}:void 0}function A(a,b,c,d,e){return b.data(Q)?w(a,b,c,d,e):(C(b,c),void d())}function B(a,b,c,d,e){var f=z(a,b,c,e.from);if(!f)return i(),void d();var g=f;return m(b,function(){g=A(a,b,c,d,e.to)}),function(a){(g||k)(a)}}function C(a,b){j.removeClass(a,b);var c=a.data(Q);c&&(c.running&&c.running--,c.running&&0!==c.running||a.removeData(Q))}function D(a,b){var c="";return a=n(a)?a:a.split(/\s+/),l(a,function(a,d){a&&a.length>0&&(c+=(d>0?" ":"")+a+b)}),c}var E,F,G,H,I="";a.ontransitionend===c&&a.onwebkittransitionend!==c?(I="-webkit-",E="WebkitTransition",F="webkitTransitionEnd transitionend"):(E="transition",F="transitionend"),a.onanimationend===c&&a.onwebkitanimationend!==c?(I="-webkit-",G="WebkitAnimation",H="webkitAnimationEnd animationend"):(G="animation",H="animationend");var J,K="Duration",L="Property",M="Delay",N="IterationCount",O="PlayState",P="$$ngAnimateKey",Q="$$ngAnimateCSS3Data",R=3,S=1.5,T=1e3,U={},V=0,W=[],X=null,Y=0,Z=[];return{animate:function(a,b,c,d,e,f){return f=f||{},f.from=c,f.to=d,B("animate",a,b,e,f)},enter:function(a,b,c){return c=c||{},B("enter",a,"ng-enter",b,c)},leave:function(a,b,c){return c=c||{},B("leave",a,"ng-leave",b,c)},move:function(a,b,c){return c=c||{},B("move",a,"ng-move",b,c)},beforeSetClass:function(a,b,c,d,e){e=e||{};var f=D(c,"-remove")+" "+D(b,"-add"),g=z("setClass",a,f,e.from);return g?(m(a,d),g):(i(),void d())},beforeAddClass:function(a,b,c,d){d=d||{};var e=z("addClass",a,D(b,"-add"),d.from);return e?(m(a,c),e):(i(),void c())},beforeRemoveClass:function(a,b,c,d){d=d||{};var e=z("removeClass",a,D(b,"-remove"),d.from);return e?(m(a,c),e):(i(),void c())},setClass:function(a,b,c,d,e){e=e||{},c=D(c,"-remove"),b=D(b,"-add");var f=c+" "+b;return A("setClass",a,f,d,e.to)},addClass:function(a,b,c,d){return d=d||{},A("addClass",a,D(b,"-add"),c,d.to)},removeClass:function(a,b,c,d){return d=d||{},A("removeClass",a,D(b,"-remove"),c,d.to)}}}])}])}(window,window.angular);