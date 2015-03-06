goog.provide("ng.material.components.gridList"),goog.require("ng.material.core"),function(){"use strict";function a(a,c,d,e){function f(b,f,g,h){function i(){for(var a in c.MEDIA)e(a),e.getQuery(c.MEDIA[a]).addListener(v);return e.watchResponsiveAttributes(["md-cols","md-row-height"],g,k)}function j(){w();for(var a in c.MEDIA)e.getQuery(c.MEDIA[a]).removeListener(v)}function k(a){null==a?h.invalidateLayout():e(a)&&h.invalidateLayout()}function l(){var a=o(),c=q(),e=t(),g=s(),h=r(),i=d(c,p(),o()).map(function(b,d){return{grid:{element:f,style:n(c,d,h,e,g)},tiles:b.map(function(b,f){return{element:angular.element(a[f]),style:m(b.position,b.spans,c,d,h,e,g)}})}}).reflow().performance();b.mdOnLayout({$event:{performance:i}})}function m(a,b,c,d,e,f,g){var h=1/c*100,i=1===c?0:(c-1)/c,j=x({share:h,gutterShare:i,gutter:e}),k={left:y({unit:j,offset:a.col,gutter:e}),width:z({unit:j,span:b.col,gutter:e}),paddingTop:"",marginTop:"",top:"",height:""};switch(f){case"fixed":k.top=y({unit:g,offset:a.row,gutter:e}),k.height=z({unit:g,span:b.row,gutter:e});break;case"ratio":var l=h*(1/g),m=x({share:l,gutterShare:i,gutter:e});k.paddingTop=z({unit:m,span:b.row,gutter:e}),k.marginTop=y({unit:m,offset:a.row,gutter:e});break;case"fit":var n=1===d?0:(d-1)/d,l=1/d*100,m=x({share:l,gutterShare:n,gutter:e});k.top=y({unit:m,offset:a.row,gutter:e}),k.height=z({unit:m,span:b.row,gutter:e})}return k}function n(a,b,c,d,e){var f={height:"",paddingBottom:""};switch(d){case"fixed":f.height=z({unit:e,span:b,gutter:c});break;case"ratio":var g=1===a?0:(a-1)/a,h=1/a*100,i=h*(1/e),j=x({share:i,gutterShare:g,gutter:c});f.paddingBottom=z({unit:j,span:b,gutter:c});break;case"fit":}return f}function o(){return h.tiles.map(function(a){return a.element})}function p(){return h.tiles.map(function(a){return{row:parseInt(e.getResponsiveAttribute(a.attrs,"md-rowspan"),10)||1,col:parseInt(e.getResponsiveAttribute(a.attrs,"md-colspan"),10)||1}})}function q(){var a=parseInt(e.getResponsiveAttribute(g,"md-cols"),10);if(isNaN(a))throw"md-grid-list: md-cols attribute was not found, or contained a non-numeric value";return a}function r(){return u(e.getResponsiveAttribute(g,"md-gutter")||1)}function s(){var a=e.getResponsiveAttribute(g,"md-row-height");switch(t()){case"fixed":return u(a);case"ratio":var b=a.split(":");return parseFloat(b[0])/parseFloat(b[1]);case"fit":return 0}}function t(){var a=e.getResponsiveAttribute(g,"md-row-height");return"fit"==a?"fit":-1!==a.indexOf(":")?"ratio":"fixed"}function u(a){return/\D$/.test(a)?a:a+"px"}f.attr("role","list"),h.layoutDelegate=l;var v=angular.bind(h,h.invalidateLayout),w=i();b.$on("$destroy",j);var x=a("{{ share }}% - ({{ gutter }} * {{ gutterShare }})"),y=a("calc(({{ unit }}) * {{ offset }} + {{ offset }} * {{ gutter }})"),z=a("calc(({{ unit }}) * {{ span }} + ({{ span }} - 1) * {{ gutter }})")}return{restrict:"E",controller:b,scope:{mdOnLayout:"&"},link:f}}function b(a){this.invalidated=!1,this.$timeout_=a,this.tiles=[],this.layoutDelegate=angular.noop}function c(a){function b(b,c){var f,g,h,i,j,k,g;return i=a.time(function(){g=d(b,c)}),f={layoutInfo:function(){return g},map:function(b){return j=a.time(function(){var a=f.layoutInfo();h=b(a.positioning,a.rowCount)}),f},reflow:function(b){return k=a.time(function(){var a=b||e;a(h.grid,h.tiles)}),f},performance:function(){return{tileCount:c.length,layoutTime:i,mapTime:j,reflowTime:k,totalTime:i+j+k}}}}function c(a,b){a.element.css(a.style),b.forEach(function(a){a.element.css(a.style)})}function d(a,b){function c(b,c){if(b.col>a)throw"md-grid-list: Tile at position "+c+" has a colspan ("+b.col+") that exceeds the column count ("+a+")";for(var g=0,k=0;k-g<b.col;)h>=a?d():(g=j.indexOf(0,h),-1!==g&&-1!==(k=f(g+1))?h=k+1:(g=k=0,d()));return e(g,b.col,b.row),h=g+b.col,{col:g,row:i}}function d(){h=0,i++,e(0,a,-1)}function e(a,b,c){for(var d=a;a+b>d;d++)j[d]=Math.max(j[d]+c,0)}function f(a){var b;for(b=a;b<j.length;b++)if(0!==j[b])return b;return b===j.length?b:void 0}function g(){for(var b=[],c=0;a>c;c++)b.push(0);return b}var h=0,i=0,j=g();return{positioning:b.map(function(a,b){return{spans:a,position:c(a,b)}}),rowCount:i+Math.max.apply(Math,j)}}var e=c;return b.animateWith=function(a){e=angular.isFunction(a)?a:c},b}function d(a){function b(b,c,d,e){c.attr("role","listitem");var f=a.watchResponsiveAttributes(["md-colspan","md-rowspan"],d,angular.bind(e,e.invalidateLayout));e.addTile(c,d,b.$parent.$index),b.$on("$destroy",function(){f(),e.removeTile(c,d)})}return{restrict:"E",require:"^mdGridList",template:"<figure ng-transclude></figure>",transclude:!0,scope:{},link:b}}function e(){return{template:"<figcaption ng-transclude></figcaption>",transclude:!0}}angular.module("material.components.gridList",["material.core"]).directive("mdGridList",a).directive("mdGridTile",d).directive("mdGridTileFooter",e).directive("mdGridTileHeader",e).factory("$mdGridLayout",c),a.$inject=["$interpolate","$mdConstant","$mdGridLayout","$mdMedia","$mdUtil"],b.$inject=["$timeout"],b.prototype={addTile:function(a,b,c){var d={element:a,attrs:b};angular.isUndefined(c)?this.tiles.push(d):this.tiles.splice(c,0,d),this.invalidateLayout()},removeTile:function(a,b){var c=this._findTileIndex(b);-1!==c&&(this.tiles.splice(c,1),this.invalidateLayout())},invalidateLayout:function(){this.invalidated||(this.invalidated=!0,this.$timeout_(angular.bind(this,this.layout)))},layout:function(){try{this.layoutDelegate()}finally{this.invalidated=!1}},_findTileIndex:function(a){for(var b=0;b<this.tiles.length;b++)if(this.tiles[b].attrs==a)return b;return-1}},c.$inject=["$mdUtil"],d.$inject=["$mdMedia"]}();