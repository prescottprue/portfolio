angular.module('portfolioApp')
.constant("FBURL", "https://prue.firebaseio.com")
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
