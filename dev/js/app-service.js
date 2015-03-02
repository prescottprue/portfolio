angular.module('portfolioApp')
.constant("FBURL", "https://prue.firebaseio.com")
.factory('projectService', function($q, $rootScope, Project, $firebase, $location, af, ProjectsArray){
    var currentProject = null;
    var projectsSync = af(["portfolio", "projects"]);
  return {
    projects: projectsSync,
    getProjects:function() {
      var deferred = $q.defer();
      ProjectsArray.$loaded().then(function(){
        deferred.resolve(ProjectsArray);
      }, function(err){
        deferred.reject(err);
      })
      return deferred.promise;
    },
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
/** Project Factory
 * @params {Object} dataSnap - Data snapshot for project
 * @returns {Project} project - Project object with attached methods
 */
.factory('Project', function(){
  function Project(dataSnap) {
    var self = _.extend(this, dataSnap.val());
    return self;
  }
  Project.prototype.matchingTagsString = function(query){
    if(query){
      return this.matchingTags(query).join(", ");
    }
  };
  /** Returns the tags of the item that matche the query
   * @params {Object} item Item to search tags of
   * @params {String} tagsStr tags seperated by ", "
   * @returns {Array} List of matching tags. Returns `null`
   */
  Project.prototype.matchingTags = function(qStr){
    var self = this;
    if(_.has(self, 'tags') && _.isArray(self.tags) && qStr && _.isString(qStr)){
      var qTagsArray = qStr.split(",");
      if(qTagsArray.length > 1) {
        //multiple tags
        qTagsArray = _.without(qTagsArray, " ");
        return _.map(qTagsArray, function(qTag){
          return getMatchingTags(qTag);
        });
      }
      return getMatchingTags(qStr);
    }
    // console.warn('Item does not contain tags', this.tags);
    return null;
    function getMatchingTags(query){
      var letterMatch = new RegExp(query, 'i');
      return _.filter(self.tags, function(tag){
        return letterMatch.test(tag.substring(0, query.length));
      });
    }
  };
    return Project;
})
.factory('ProjectsArray', function($FirebaseArray, af, Project){
    function ProjectArrayFactory(){
      return $FirebaseArray.$extendFactory({
        $$added:function(snap){
          return new Project(snap);
        }
      });
    }
		return af(['portfolio', 'projects'], {arrayFactory:ProjectArrayFactory()}).$asArray();
})
/** Firebase Ref function from https://github.com/firebase/angularfire-seed/blob/master/app/js/firebase.utils.js
 * @constructor
 * @name af
 * @param {String|Array} path - `required` relative path to the root folder in Firebase instance
 * @param {Function} factory - `optional` Factory object to apply to angularfireObject/Array
 * @return an AngularFire $firebase Object
 */
.factory('af', ['$firebase', 'FBURL', function($firebase, FBURL){
  return function(path, factory){
    return factory ? $firebase(firebaseRef(path), factory):$firebase(firebaseRef(path));
  }
  /** Firebase Ref function from https://github.com/firebase/angularfire-seed/blob/master/app/js/firebase.utils.js
   * @function
   * @name firebaseRef
   * @param {String|Array} path relative path to the root folder in Firebase instance
   * @return a Firebase instance
   */
  function firebaseRef(path) {
    var ref = new Firebase(FBURL);
    var args = Array.prototype.slice.call(arguments);
    if( args.length ) {
      ref = ref.child(pathRef(args));
    }
    return ref;
  }
  /** Internal Path utility function from https://github.com/firebase/angularfire-seed/blob/master/app/js/firebase.utils.js
   * @function
   * @name pathRef
   * @param {Array} args Array of reference children
   * @return {string} pathUrl Url of path in string form
   */
  function pathRef(args) {
    for (var i = 0; i < args.length; i++) {
      if (angular.isArray(args[i])) {
        args[i] = pathRef(args[i]);
      }
      else if( typeof args[i] !== 'string' ) {
        throw new Error('Argument '+i+' to firebaseRef is not a string: '+args[i]);
      }
    }
    return args.join('/');
  }
}])
