function parseStateRef(a,b){var c,d=a.match(/^\s*({[^}]*})\s*$/);if(d&&(a=b+"("+d[1]+")"),c=a.replace(/\n/g," ").match(/^([^(]+?)\s*(\((.*)\))?$/),!c||4!==c.length)throw new Error("Invalid state ref '"+a+"'");return{state:c[1],paramExpr:c[3]||null}}function stateContext(a){var b=a.parent().inheritedData("$uiView");return b&&b.state&&b.state.name?b.state:void 0}function $StateRefDirective(a,b){var c=["location","inherit","reload"];return{restrict:"A",require:["?^uiSrefActive","?^uiSrefActiveEq"],link:function(d,e,f,g){var h=parseStateRef(f.uiSref,a.current.name),i=null,j=stateContext(e)||a.$current,k=null,l="A"===e.prop("tagName"),m="FORM"===e[0].nodeName,n=m?"action":"href",o=!0,p={relative:j,inherit:!0},q=d.$eval(f.uiSrefOpts)||{};angular.forEach(c,function(a){a in q&&(p[a]=q[a])});var r=function(b){if(b&&(i=angular.copy(b)),o){k=a.href(h.state,i,p);var c=g[1]||g[0];return c&&c.$$setStateInfo(h.state,i),null===k?(o=!1,!1):void f.$set(n,k)}};h.paramExpr&&(d.$watch(h.paramExpr,function(a){a!==i&&r(a)},!0),i=angular.copy(d.$eval(h.paramExpr))),r(),m||e.bind("click",function(c){var d=c.which||c.button;if(!(d>1||c.ctrlKey||c.metaKey||c.shiftKey||e.attr("target"))){var f=b(function(){a.go(h.state,i,p)});c.preventDefault();var g=l&&!k?1:0;c.preventDefault=function(){g--<=0&&b.cancel(f)}}})}}}function $StateRefActiveDirective(a,b,c){return{restrict:"A",controller:["$scope","$element","$attrs",function(b,d,e){function f(){g()?d.addClass(j):d.removeClass(j)}function g(){return"undefined"!=typeof e.uiSrefActiveEq?h&&a.is(h.name,i):h&&a.includes(h.name,i)}var h,i,j;j=c(e.uiSrefActiveEq||e.uiSrefActive||"",!1)(b),this.$$setStateInfo=function(b,c){h=a.get(b,stateContext(d)),i=c,f()},b.$on("$stateChangeSuccess",f)}]}}$StateRefDirective.$inject=["$state","$timeout"],$StateRefActiveDirective.$inject=["$state","$stateParams","$interpolate"],angular.module("ui.router.state").directive("uiSref",$StateRefDirective).directive("uiSrefActive",$StateRefActiveDirective).directive("uiSrefActiveEq",$StateRefActiveDirective);