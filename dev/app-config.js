angular.module('portfolioApp')

.constant("FBURL", "https://prue.firebaseio.com")

.config(function ($mdThemingProvider, $analyticsProvider){
  // $analyticsProvider.firstPageview(true); /* Records pages that don't use $state or $route */
  $analyticsProvider.withAutoBase(true);  /* Records full path */
  $analyticsProvider.virtualPageviews(true);
  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('red')
    .warnPalette('indigo')
});
