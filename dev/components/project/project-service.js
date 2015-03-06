angular.module('portfolioApp')
.factory('projectService', function($q, $rootScope, Project, ProjectFactory, $location, ProjectsArray, FBURL){
    var currentProject = null;
    var syncArray = null;
  return {
    projects: ProjectsArray,
    getProjects:function() {
      var deferred = $q.defer();
      console.log('projectsARray', ProjectsArray)
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
    getProject: function(ind){
      var deferred = $q.defer();
      if(!syncArray){
        this.getProjects().then(function(projectArray){
          deferred.resolve(projectArray.$getRecord(ind));
        });
      }
      if(currentProject){
        deferred.resolve(currentProject);
      }
      return deferred.promise;

    },
    setCurrentProject:function(projectObj){
      return currentProject = projectObj;
    },
    getCurrentProject:function(pName){
      var deferred = $q.defer();
      if(currentProject){
        deferred.resolve(currentProject);
      }
      if(pName && syncArray){
        syncArray.$getRecord(pName);
      }
      var projectRef = new Firebase(FBURL + "/portfolio/projects/"+pName);
      projectRef.on('value', function(projectSnap){
        currentProject = new Project(projectSnap);
        deferred.resolve(currentProject);
      }, function(err){
        deferred.reject(err);
      });
      return deferred.promise;
    },
  }
})
/** Project Factory
 * @params {Object} dataSnap - Data snapshot for project
 * @returns {Project} project - Project object with attached methods
 */
.factory('Project', function(){
  function Project(dataSnap) {
    if(_.contains(_.methods(dataSnap), 'val')){
      this.$id = dataSnap.key();
      _.extend(this, dataSnap.val());
    }
  };
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
.factory('ProjectFactory', function($firebaseObject, Project, FBURL){
  var ref = new Firebase(FBURL + "/portfolio/projects");
  var extendedProject = $firebaseObject.$extend(Project);

  return function(pKey){
    if(pKey){
      ref = ref.child(pKey);
    }
    console.log('trying to load project with pname', pKey);

    return new extendedProject(ref);
  }
})
.factory('ProjectsArray', function($firebaseArray, Project, FBURL){
      var extendedArray = $firebaseArray.$extend({
        $$added:function(snap){
          return new Project(snap);
        },
        matchingProjects:function(qStr){
          if(qStr && _.isString(qStr)){
            var projectsArray = [];
            angular.forEach(this.$list, function(proj){
              proj.matchesSearch(qStr) ? projectsArray.push(proj) : null;
            })
          }
        }
      });
    var ref = new Firebase(FBURL + "/portfolio/projects");
		return new extendedArray(ref);
})
