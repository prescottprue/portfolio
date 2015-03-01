angular.module('portfolioApp')
.factory('projectService', function($q, $rootScope, Project, $firebase, $location){

  var projectsArray = [
      {
        name:'Basilar',
        url:'basilar',
        tags:['engineering', 'modeling', 'programming', 'parametric'],
        pages:[
          {
            image:{url:'img/Basilar/Basilar-Logo.png', style:'width:500px; border-style:none; background-color:white;'},
            caption:'DJs and Live producers need the interface to their music software to be as fluid as possible. Standardized controllers, such as what is currently availble on the market, cause this interface to fall short. Basilar was started to allow artists to choose what they need in their controller to best interact with their media. Using our simple drag and drop interface users can create their own controller layout. After picking a design the user would be able to share their designs or order the controller direclty from Basilar.',
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
        url:'pyro',
        tags:['engineering', 'programming', 'nodejs', 'angularjs', 'javascript'],
        buttons:[{name:'pyroplatform.com'}],
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
        url:'hearthub',
        tags:['engineering', 'programming', 'nodejs', 'angularjs', 'javascript', 'api', 'healthcare', 'hackathon'],
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
      },
      {
        name:'Escollate',
        url:'escollate',
        tags:['engineering', 'programming', 'nodejs', 'angularjs', 'javascript', 'smallbizdev', 'hackathon'],
        buttons:[{name:'Challenge Post', path:'http://challengepost.com/software/escollate'},
          {name:'GitHub', path:'https://github.com/prescottprue/escollate'},
          {name:'App Demo', path:'https://github.com/prescottprue/escollate'}
        ],
        pages:[
          {
            image:{url:'img/Escollate/HoldingCheck.png', style:'width:500px; border-style:none; background-color:white;'},
            caption:'Escollate is a cross-platform mobile application that allows small business owners to solve complex financial problems by combining the power of real-time data with the wisdom of a collaborative community. By connecting Escollate with their Quickbooks accounts, our customers can view, track, and visualize the financial performance and financial health of their small businesses through an elegant Dashboard. For each of these metrics (such as revenue growth, gross profit growth, EBIDTA growth, net income growth, gross margin, and EBIDTA margin), small business owners see how their company compares to the rest of the market. Unlike existing financial summary solutions, Escollate also provides an anonymous social platform where users can ask questions about their finances, the state of their business, or anything else that may need clarification by like-minded small business owners. By tapping the "Ask a Question" link for a Dashboard item, the user can publish a question about a specific metric with just a few clicks. By marrying a simple, yet powerful user experience for tracking and understanding financial data with social network of informed supporters, Escollate gives small business owners "Strength in Numbers".'

          },
          {
            background:'img/Escollate/HoldingCheck.png',
            caption:'Escollate is a cross-platform mobile application that allows small business owners to solve complex financial problems by combining the power of real-time data with the wisdom of a collaborative community. By connecting Escollate with their Quickbooks accounts, our customers can view, track, and visualize the financial performance and financial health of their small businesses through an elegant Dashboard. For each of these metrics (such as revenue growth, gross profit growth, EBIDTA growth, net income growth, gross margin, and EBIDTA margin), small business owners see how their company compares to the rest of the market. Unlike existing financial summary solutions, Escollate also provides an anonymous social platform where users can ask questions about their finances, the state of their business, or anything else that may need clarification by like-minded small business owners. By tapping the "Ask a Question" link for a Dashboard item, the user can publish a question about a specific metric with just a few clicks. By marrying a simple, yet powerful user experience for tracking and understanding financial data with social network of informed supporters, Escollate gives small business owners "Strength in Numbers".'
          },
        ]
      },
      {
        name:'S.P.H.S Computer Science Club',
        url:'sphscs',
        tags:['engineering', 'programming', 'volunteering', 'javascript', 'teaching'],
        links:[{name:'Challenge Post', link:'http://challengepost.com/software/escollate'}],
        pages:[
          {
            image:{url:'img/SPHS-CS/FirstHackathon.png', style:'width:500px; border-style:none; background-color:white;'},
            caption:'Escollate is a cross-platform mobile application that allows small business owners to solve complex financial problems by combining the power of real-time data with the wisdom of a collaborative community. By connecting Escollate with their Quickbooks accounts, our customers can view, track, and visualize the financial performance and financial health of their small businesses through an elegant Dashboard. For each of these metrics (such as revenue growth, gross profit growth, EBIDTA growth, net income growth, gross margin, and EBIDTA margin), small business owners see how their company compares to the rest of the market. Unlike existing financial summary solutions, Escollate also provides an anonymous social platform where users can ask questions about their finances, the state of their business, or anything else that may need clarification by like-minded small business owners. By tapping the "Ask a Question" link for a Dashboard item, the user can publish a question about a specific metric with just a few clicks. By marrying a simple, yet powerful user experience for tracking and understanding financial data with social network of informed supporters, Escollate gives small business owners "Strength in Numbers".'

          },
          {
            background:'img/SPHS-CS/FirstHackathon.png',
            caption:'Escollate is a cross-platform mobile application that allows small business owners to solve complex financial problems by combining the power of real-time data with the wisdom of a collaborative community. By connecting Escollate with their Quickbooks accounts, our customers can view, track, and visualize the financial performance and financial health of their small businesses through an elegant Dashboard. For each of these metrics (such as revenue growth, gross profit growth, EBIDTA growth, net income growth, gross margin, and EBIDTA margin), small business owners see how their company compares to the rest of the market. Unlike existing financial summary solutions, Escollate also provides an anonymous social platform where users can ask questions about their finances, the state of their business, or anything else that may need clarification by like-minded small business owners. By tapping the "Ask a Question" link for a Dashboard item, the user can publish a question about a specific metric with just a few clicks. By marrying a simple, yet powerful user experience for tracking and understanding financial data with social network of informed supporters, Escollate gives small business owners "Strength in Numbers".'
          },
        ]
      },
      {
        name:'Wakeboarding Tower',
        url: 'tower',
        tags:['engineering', 'modeling', 'welding'],
        // links:[{name:'Challenge Post', link:'http://challengepost.com/software/escollate'}],
        pages:[
          {
            image:{url:'img/Escollate/HoldingCheck.png', style:'width:500px; border-style:none; background-color:white;'},
            caption:'Escollate is a cross-platform mobile application that allows small business owners to solve complex financial problems by combining the power of real-time data with the wisdom of a collaborative community. By connecting Escollate with their Quickbooks accounts, our customers can view, track, and visualize the financial performance and financial health of their small businesses through an elegant Dashboard. For each of these metrics (such as revenue growth, gross profit growth, EBIDTA growth, net income growth, gross margin, and EBIDTA margin), small business owners see how their company compares to the rest of the market. Unlike existing financial summary solutions, Escollate also provides an anonymous social platform where users can ask questions about their finances, the state of their business, or anything else that may need clarification by like-minded small business owners. By tapping the "Ask a Question" link for a Dashboard item, the user can publish a question about a specific metric with just a few clicks. By marrying a simple, yet powerful user experience for tracking and understanding financial data with social network of informed supporters, Escollate gives small business owners "Strength in Numbers".'

          },
          {
            background:'img/Escollate/HoldingCheck.png',
            caption:'Escollate is a cross-platform mobile application that allows small business owners to solve complex financial problems by combining the power of real-time data with the wisdom of a collaborative community. By connecting Escollate with their Quickbooks accounts, our customers can view, track, and visualize the financial performance and financial health of their small businesses through an elegant Dashboard. For each of these metrics (such as revenue growth, gross profit growth, EBIDTA growth, net income growth, gross margin, and EBIDTA margin), small business owners see how their company compares to the rest of the market. Unlike existing financial summary solutions, Escollate also provides an anonymous social platform where users can ask questions about their finances, the state of their business, or anything else that may need clarification by like-minded small business owners. By tapping the "Ask a Question" link for a Dashboard item, the user can publish a question about a specific metric with just a few clicks. By marrying a simple, yet powerful user experience for tracking and understanding financial data with social network of informed supporters, Escollate gives small business owners "Strength in Numbers".'
          },
        ]
      }
    ];
    var currentProject = null;
  return {
    // projects: function(){
    //   return _.map(projectsArray, function(projectData){
    //     return Project(projectData);
    //   });
    // },
    projects: projectsArray,
    findMatchingTags:function(itemTags, qStr){
      function matchingTags(itemTags, qStr) {
        if(!itemTags || !qStr || qStr == "" || qStr == " ") return [];
        var letterMatch = new RegExp(qStr, 'i');
        if(_.isArray(itemTags)) {
          // _.some finds if item contains tag
          var matchingTags = _.filter(itemTags, function(tag){
            return letterMatch.test(tag.substring(0, qStr.length));
          });
          // console.log('returning matching tags:', matchingTags);
          return matchingTags;
        }
        console.warn('item tags is not an array', itemTags);
        return [];
      }
      if(qStr && _.isString(qStr)){
        var qTagsArray = qStr.split(",");
          if(qTagsArray.length > 1) {
            //multiple tags
            //_.some would show projects that contain any of the tags
            return _.map(qTagsArray, function(tag){
              return matchingTags(itemTags, tag);
            }).join(", ");
          }
          //Single tag
          return matchingTags(itemTags, qStr).join(", ");
      }
      //Query is null
      return null;
    },
    getProject: function(params){
      return _.findWhere(this.projects, params);
    },
    setCurrentProject:function(params){
      console.log('setting current project:', _.findWhere(this.projects, params));
      return currentProject = _.findWhere(this.projects, params);
    },
    getCurrentProject:function(params){
      if(currentProject){
        return currentProject;
      }
      return currentProject = _.findWhere(this.projects, {url:$location.path()});
    },
  }
})
.factory('Project', function(){
  return function (projectData){
    /** Returns the tags of the item that matche the query
     * @params {Object} item Item to search tags of
     * @params {String} tagsStr tags seperated by ", "
     * @returns {Boolean} whether or not the item contains a tag
     */
    function matchingTags(itemTags, qStr) {
      if(!itemTags || !qStr || qStr == "" || qStr == " ") return [];
      var letterMatch = new RegExp(qStr, 'i');
      if(_.isArray(itemTags)) {
        // _.some finds if item contains tag
        var matchingTags = _.filter(itemTags, function(tag){
          return letterMatch.test(tag.substring(0, qStr.length));
        });
        console.log('returning matching tags:', matchingTags);
        return matchingTags;
      }
      console.log('item tags is not an array', itemTags);
      return [];
    }
    function Project(dataObj) {
      var self = dataObj;

      self.matchingTagsArray = function(query){
        /** Returns the tags of the item that matche the query
         * @params {Object} item Item to search tags of
         * @params {String} tagsStr tags seperated by ", "
         * @returns {Boolean} whether or not the item contains a tag
         */
         var self = this;
         if(query && _.isString(query)){
           var qTagsArray = query.split(",");
             if(qTagsArray.length > 1) {
               qTagsArray = _.without(qTagsArray, "", " ");
               //multiple tags
               //_.some would show projects that contain any of the tags
               return _.filter(qTagsArray, function(tag){
                 return matchingTags(self.tags, tag);
               });
             }
             //Single tag
             return matchingTags(self.tags, query);
         }
         //Query is null
         return null;
      }
      self.matchingTagsString = function(query){
        var self = this;
        if(query && _.isString(query)){
          var qTagsArray = query.split(",");

            if(qTagsArray.length > 1) {
              qTagsArray = _.without(qTagsArray, "", " ");

              //multiple tags
              //_.some would show projects that contain any of the tags
              return _.map(qTagsArray, function(tag){
                return matchingTags(self.tags, tag);
              }).join(", ");
            }
            //Single tag
            return matchingTags(self.tags, query).join(", ");
        }
        //Query is null
        return null;
      }
      return self;
    }
    // Project.prototype.matchingTags = function(qStr){
    //   /** Returns the tags of the item that matche the query
    //    * @params {Object} item Item to search tags of
    //    * @params {String} tagsStr tags seperated by ", "
    //    * @returns {Boolean} whether or not the item contains a tag
    //    */
    //    var self = this;
    //     if(!qStr || qStr == "" || qStr == " ") return [];
    //     var letterMatch = new RegExp(qStr, 'i');
    //     if(_.has(self, "tags") && _.isArray(self.tags)) {
    //       // _.some finds if item contains tag
    //       var matchingTags = _.filter(self.tags, function(tag){
    //         return letterMatch.test(tag.substring(0, qStr.length));
    //       });
    //       console.log('returning matching tags:', matchingTags);
    //       return matchingTags;
    //     }
    //     console.log('item tags is not an array', self.tags);
    //     return [];
    // }
    return Project(projectData);
  }
})
// .factory('ProjectArray', function($firebase, $FirebaseArray){
// 	return function(list){
// 		return $firebase(list, {arrayFactory:ProjectArrayFactory()}).$asArray();
// 	}
// })
// .factory('ProjectObject', function($firebase, ProjectObjectFactory){
// 	return function(list){
// 		// query for objects created by user
// 		var query = pyroMaster.mainRef.child(list).orderByChild('author').equalTo(auth.uid);
// 		return $firebase(query, {arrayFactory:ProjectObjectFactory()}).$asObject();
// 	}
// })
// .factory('ProjectObject', function($firebase, ProjectObjectFactory){
// 	return function(list){
// 		// query for objects created by user
// 		var auth = pyroMaster.getAuth();
// 		console.log('pyroMaster:', pyroMaster);
// 		var query = pyroMaster.mainRef.child(list).orderByChild('author').equalTo(auth.uid);
// 		return $firebase(query, {arrayFactory:ProjectObjectFactory()}).$asObject();
// 	}
// })
// .factory('af', function($firebase){
//   return $firebase('https://')
//
// })
