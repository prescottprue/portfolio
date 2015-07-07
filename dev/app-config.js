var app = angular.module('portfolioApp')

.service("ENV", ['$location', '$log', function ($location, $log){
	return {
		FBURL:function(){
			var url = "https://prue.firebaseio.com";
			if($location.host() == "localhost"){
				url = "https://pruvit.firebaseio.com";
			}
			$log.info('Firebase URL: ' + url);
			return url;
		}
	}
}])

.config(function ($mdThemingProvider, $analyticsProvider){
  // $analyticsProvider.firstPageview(true); /* Records pages that don't use $state or $route */
  $analyticsProvider.withAutoBase(true);  /* Records full path */
  $analyticsProvider.virtualPageviews(true);
  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('red')
    .warnPalette('indigo')
});
