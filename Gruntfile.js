/* global module:false */
module.exports = function(grunt) {
	// Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		config: grunt.file.readJSON('config.json'),
		uglify: {
			options: {
				banner: '<%= meta.banner %>\n'
			},
			build: {
				src: 'js/reveal.js',
				dest: 'js/reveal.min.js'
			}
		},

		cssmin: {
			compress: {
				files: {
					'css/reveal.min.css': [ 'css/reveal.css' ]
				}
			}
		},

		// sass: {
		// 	main: {
		// 		files: {
		// 			'css/theme/default.css': 'css/theme/source/default.scss',
		// 			'css/theme/beige.css': 'css/theme/source/beige.scss',
		// 			'css/theme/night.css': 'css/theme/source/night.scss',
		// 			'css/theme/serif.css': 'css/theme/source/serif.scss',
		// 			'css/theme/simple.css': 'css/theme/source/simple.scss',
		// 			'css/theme/sky.css': 'css/theme/source/sky.scss',
		// 			'css/theme/moon.css': 'css/theme/source/moon.scss',
		// 			'css/theme/solarized.css': 'css/theme/source/solarized.scss',
		// 			'css/theme/blood.css': 'css/theme/source/blood.scss'
		// 		}
		// 	}
		// },

		jshint: {
			options: {
				curly: false,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				eqnull: true,
				browser: true,
				expr: true,
				globals: {
					head: false,
					module: false,
					console: false,
					unescape: false
				}
			},
			files: [ 'Gruntfile.js', 'js/reveal.js' ]
		},

		connect: {
			server: {
				options: {
					port: '<%= config.port %>',
					base: './dev/',
					livereload:true
				}
			}
		},
		watch: {
			main: {
				files: [ 'Gruntfile.js', 'dev/templates/*.html', 'dev/index.html', 'dev/js/**', 'dev/styles/**', 'dev/components/**'  ],
				options:{
					livereload:35729
				}
			},
			theme: {
				files: [ 'css/theme/source/*.scss', 'css/theme/template/*.scss' ],
				tasks: 'themes'
			},
			bower: {
				files: [ 'bower.json'],
				tasks: 'wiredep'
			}
		},

		wiredep: {

		  task: {

		    // Point to the files that should be updated when
		    // you run `grunt wiredep`
		    src: [
		      'dev/index.html',   // .html support...
		    ],
		    options: {
		      // See wiredep's configuration documentation for the options
		      // you may pass:

		      // https://github.com/taptapship/wiredep#configuration
		    }
		  }
		},
    aws_s3:{
      production:{
        options: {
          accessKeyId: '<%= config.AWSAccessKeyId %>',
          secretAccessKey: '<%= config.AWSSecretKey %>',
          bucket:'prescottprue.com',
          uploadConcurrency: 30,
          region:'us-west-2'
        },
        files:[
          {'action': 'upload', expand: true, cwd: 'dev/', src: ['**'], dest: ''},
          // {'action': 'upload', expand: true, cwd: 'dist/', src: ['**'], dest: '<%= pkg.version %>'},
        ]
      },
      staging:{
        options: {
          accessKeyId: '<%= config.AWSAccessKeyId %>',
          secretAccessKey: '<%= config.AWSSecretKey %>',
          bucket:'prescottprue.com',
          uploadConcurrency: 30,
          region:'us-west-2'
        },
        files:[
          {'action': 'upload', expand: true, cwd: 'dev/', src: ['**'], dest: ''},
          {'action': 'upload', expand: true, cwd: 'dev/', src: ['**'], dest: 'staging/<%= pkg.version %>'}
        ]
      }
    },
    uglify: {
	    dist: {
	      files: [{
	          expand: true,
	          cwd: 'dev/js',
	          src: '**/*.js',
	          dest: 'dist/js'
	      }]
	    }
	  },
	  htmlmin: {                                     // Task
	    dist: {                                      // Target
	      options: {                                 // Target options
	        removeComments: true,
	        collapseWhitespace: true
	      },
	      files: {                                   // Dictionary of files
	        'dist/index.html': 'dev/index.html'   // 'destination': 'source'
	      }
	    },
	  },
	  cssmin: {
		  target: {
		    files: [{
		      expand: true,
		      cwd: 'dev/styles',
		      src: ['**/*.css', '!**/*.min.css'],
		      dest: 'dist/styles',
		    }]
		  }
		}

	});

	// Dependencies
	require('load-grunt-tasks')(grunt);
	// Default task
	grunt.registerTask( 'default', ['connect', 'watch'] );

	// Theme task
	grunt.registerTask( 'themes', [ 'sass' ] );

	// Serve presentation locally
	grunt.registerTask( 'serve', [ 'connect', 'watch' ] );

	grunt.registerTask( 'build', [ 'uglify:dist', 'htmlmin:dist', 'cssmin' ] );

  grunt.registerTask( 'stage', [ 'htmlmin:dist', 'cssmin', 'uglify:dist', 'aws_s3:staging' ] );

  grunt.registerTask( 'release', [ 'aws_s3:production', 'uglify:dist' ] );


	// Run tests
	grunt.registerTask( 'test', [ 'jshint' ] );

};
