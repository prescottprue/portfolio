angular.module("portfolioApp",["ui.router","picardy.fontawesome","ngMaterial","firebase"]).config(function(a,b,c){a.state("navbar",{templateUrl:"templates/navbar.html","abstract":!0}).state("home",{parent:"navbar",url:"/",templateUrl:"components/home/home-index.html",controller:"HomeCtrl"}).state("project",{parent:"navbar",url:"/projects/:pName",templateUrl:"components/project/project-index.html",controller:"ProjectCtrl"}).state("contact",{parent:"navbar",url:"/contact",templateUrl:"components/contact/contact-index.html",controller:"ContactCtrl"}),b.otherwise("/"),c.theme("default").primaryPalette("blue").accentPalette("pink")}).filter("search",function(){return function(a,b){return b&&_.isString?_.filter(a,function(a){return a.matchesSearch(b)}):a}});