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
    getProject: function(params){
      if(!syncArray){
        this.getProjects().then(function(projectArray){
          _.findWhere(projectArray, params);
        });
      }
      return currentProject;
    },
    setCurrentProject:function(projectObj){
      return currentProject = projectObj;
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
  Project.prototype.matchesSearch = function(query){
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
  };
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
        },
        matchingProjects:function(qStr){
          if(qStr && _.isString(qStr)){

          }
        }
      });
    }
		return af(['portfolio', 'projects'], {arrayFactory:ProjectArrayFactory()}).$asArray();
})
