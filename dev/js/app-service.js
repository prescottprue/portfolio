angular.module('portfolioApp')
.factory('projectService', function($q, $rootScope){
  var projectsArray = [
      // {
      //   // contentUrl:'views/home.html'
      //   name:'Home',
      //   content:'<div style="height:400px;"><h2 class="name" style="color:#DCDCDD">Scott Prue</h2><h4>Project Portfolio</h4></div>'
      // },
      {
        name:'Basilar',
        background:'#46494c',
        pages:[
          {
            image:{url:'img/Basilar/Basilar-Logo.png', style:'width:500px; border-style:none; background-color:white;'},
            caption:'DJs and Live producers need the interface to their music software to be as fluid as possible. Standardized controllers, such as what is currently availble on the market, cause this interface to fall short. Basilar was started to allow artists to choose what they need in their controller to best interact with their media. Using our simple drag and drop interface users can create their own controller layout. After picking a design the user would be able to share their designs or order the controller direclty from Basilar.',
            subCaption:'Go down to view the first controller design'
          },
          {
            background:'img/Basilar/First-Lighting.jpg',
            caption:'This is a 4 deck mixer that mirrors the layout of one of the most popular live DJ software packages (Native Instruments Traktor). Buttons replace the jog wheels that are often seen on this size controller.'
          },
          {
            background:'img/Basilar/Exposed-Controller.png',
            caption:'Spacing of circuitry components is automatically accounted for and wireing is routed to avoid being pinched/cut when being serviced. Modularized design of these components allows users to easy order and replace parts themselves instead of waiting weeks for a factory repair.'
          },
          {
            background:'img/Basilar/Stress-Test.png',
            caption:'Automated stress testing of support structures is imperative to guarantee control hardware remains intact. Deflection was minimized and directed to areas that do not contain connection hardware.'
          }
        ]
      },

      {
        name:'Pyro',
        pages:[
          {
            background:'img/Pyro/Pyro-Home.png',
            caption:'Pyro Labs was started to teach programming through hands on projects. The Pyro platform is our first iteration of this idea that teaches through walking a user through creating their first app. After the click of a button you have a live app with the capability to have users sign up as well as sign in. All of the data generated by these users is availble in realtime from the start.'
          },
          {
            background:'img/Pyro/Pyro-Editor.png',
            caption:'The Pyro editor panel allows users to program with every key stroke saved directly to the realtime cloud which means no saving required! We allow our users to go as in depth as they would like by providing hands on tutorials that start at the basics. Even the most advanced users are also comfortable in editor as it adheres to standards put into place by the  creaters of the advanced frameworks we use within the platform.'
          },
          {
            background:'img/Pyro/Pyro-Tester.png',
            caption:'After programming in the Editor tab you can view your changes to your app right away by going to the tester panel. You can see how your changes look before clicking the cloud button to push it to all of your users.'
          }
        ]
      },
      {
        name:'Hearthub',
        background:'#46494c',
        pages:[
          {
            image:{url:'img/HeartHub/HeartHubLogo.png', style:'width:500px; border-style:none; background-color:white;'},
            caption:"Hearthub is a project that started and presented with a team formed at MIT Hacking Medcine Grandhack event. It is a standardized platform/API for medical devices within hospitals. The HeartHub API is being designed to provide medical device developers an easy method for sharing their device's data directly with the hospital. The data provided by these developers is organized and provided to the hospital by our platform."
          },
          {
            background:'img/HeartHub/HeartHubDemo.png',
            caption:"The HeartHub Dashboard gives hospitals an overview of their data with important metrics from all plugins/devices. Clicking on a metric brings you to the detailed breakdown on the devices/module which produced that data. For example we can click on the hand washing sanatizing statistics to view details on the devices that produced this data."
          },
          {
            background:'img/HeartHub/HeartHubAnalytics.png',
            caption:"Easily visualization of data for the hospitals in which these devices are installed are imperative. Realtime analytics was included in HeartHub from the start to provide important data as it is updated such as radiation warings and wireless medical devices."
          },
        ]
      }
    ];
    var currentProject = null;
  return {
    projects: projectsArray,
    getProject: function(params){
      return _.findWhere(this.projects, params);
    },
    setCurrentProject:function(params){
      console.log('setting current project:', _.findWhere(this.projects, params));
      return currentProject = _.findWhere(this.projects, params);
    },
    getCurrentProject:function(params){
      console.log('getting project:', currentProject);
      return currentProject;
    }
  }
})
