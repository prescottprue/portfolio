angular.module('portfolioApp')
.factory('projectService', function($q, $rootScope, Project, $firebase, $location, af, ProjectsArray){
    var currentProject = null;
    var projectsSync = af(["portfolio", "projects"]);
    var syncArray = null;
  return {
    projects: projectsSync,
    getProjects:function() {
      var deferred = $q.defer();
      ProjectsArray.$loaded().then(function(){
        syncArray = ProjectsArray;
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
    getProject: function(key){
      var deferred = $q.defer();

      currentProject = Project(key);
      currentProject.$loaded().then(function(){
        deferred.resolve(currentProject);
      }, function(err){
        deferred.reject(err);
      });
      
      return deferred.promise;
    },
    setCurrentProject:function(key){
      return currentProject = Project(key);
    },
    getCurrentProject:function(params){
      var deferred = $q.defer();
      if(currentProject){
        deferred.resolve(currentProject);
      }
      if(!syncArray){
        console.log('projectsSync:', projectsSync);
        projectsSync.$asObject().$loaded().then(function(projectArray){
          console.log('projectArray', projectArray);
          console.log('params:', params);
          deferred.resolve(_.findWhere(projectArray, params));
        });
      }
      return deferred.promise;
    },
  }
})
/** Project Factory
 * @params {Object} dataSnap - Data snapshot for project
 * @returns {Project} project - Project object with attached methods
 */
.factory('Project', function(af, $FirebaseObject){

  function ProjectFactory(){
    return $FirebaseObject.$extendFactory({
      matchesSearch : function(query){
        var self = this;
        if(query && _.isString(query)){
          var letterMatch = new RegExp(query, 'i');
          if (letterMatch.test(self.name.substring(0, query.length))) {
              return true;
          }
          //Single tag
          if(itemContainsTag(query)){
            return true;
          }
          return false;
        }
        return false;

        function itemContainsTag(tagStr){
          var qArray = tagStr.split(",");
          if(qArray.length > 1) {
            //multiple tags
            //_.some would show projects that contain any of the tags
            return _.every(qArray, function(tag){
              return checkItemForTag(self, tag);
            });
          }
          //Single tag
          return checkItemForTag(self, query);
        }
        function checkItemForTag(item, tagStr) {
          if(tagStr == "" || tagStr == " ") return true;
          var letterMatch = new RegExp(tagStr, 'i');
          if(_.has(item, "tags") && _.isArray(item.tags)) {
            // _.some finds if item contains tag
            var containsTag = _.some(item.tags, function(tag){
              return letterMatch.test(tag.substring(0, tagStr.length));
            });
            return containsTag;
          }
          return false;
        }
      },
      matchingTagsString : function(query){
        if(query){
          return this.matchingTags(query).join(", ");
        }
      },
      /** Returns the tags of the item that matche the query
       * @params {Object} item Item to search tags of
       * @params {String} tagsStr tags seperated by ", "
       * @returns {Array} List of matching tags. Returns `null`
       */
      matchingTags : function(qStr){
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
      }

    });
  }

  return function(id){
    return af(['portfolio', 'projects', id], {objectFactory:ProjectFactory()}).$asObject();
  }
})
.factory('$Project', function(){

})
.factory('ProjectsArray', function($FirebaseArray, af, Project){
    function ProjectArrayFactory(){
      return $FirebaseArray.$extendFactory({
        $$added:function(snap){
          return Project(snap.key());
        }
      });
    }
		return af(['portfolio', 'projects'], {arrayFactory:ProjectArrayFactory()}).$asArray();
})
