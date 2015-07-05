angular.module('portfolioApp')
.config(function ($stateProvider, $urlRouterProvider){
  $stateProvider
  .state('navbar', {
    templateUrl: 'templates/navbar.html',
    abstract:true
  })
  .state('home', {
    parent:'navbar',
    url: '/',
    templateUrl: 'home/home-index.html',
    controller:'HomeCtrl'
  })
  .state('project', {
    parent:'navbar',
    url: '/projects/:pKey',
    templateUrl: 'project/project-index.html',
    controller:'ProjectCtrl'
  })
  .state('contact', {
    parent:'navbar',
    url: '/contact',
    templateUrl: 'contact/contact-index.html',
    controller:'ContactCtrl'
  })
  $urlRouterProvider.otherwise("/");
});