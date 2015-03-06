module.exports = function(grunt) {
	// Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		config: grunt.file.readJSON('config.json'),
		env: grunt.file.readJSON('env.json') || process.env,
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
			files: [ 'Gruntfile.js', '<%= config.devFolder %>/components/**/*.js' ]
		},
		connect: {
			dev: {
				options: {
					port: '<%= config.port %>' || 9000,
					base: './<%= config.devFolder %>/' || './dev/',
					livereload:true
				}
			},
			dist: {
				options: {
					port: '<%= config.port %>' || 9000,
					base: './<%= config.devFolder %>/' || './dev/',
					livereload:true
				}
			}
		},
		watch: {
			main: {
				files: [ 'Gruntfile.js', '<%= config.devFolder %>/templates/*.html', '<%= config.devFolder %>/index.html', '<%= config.devFolder %>/js/**', '<%= config.devFolder %>/styles/**', '<%= config.devFolder %>/components/**'  ],
				options:{
					livereload:35729
				}
			},
			bower: {
				files: [ 'bower.json'],
				tasks: 'wiredep'
			},
			images: {
				files: [ '<%= config.devFolder %>/img/**'],
				tasks: 'aws_s3:images'
			}
		},
		wiredep: {
		  main: {
		    src: ['<%= config.devFolder %>/index.html']
		  }
		},
    aws_s3:{
			options:{
				accessKeyId:'<%= env.AWSAccessKeyId %>' || process.env.AWS_ACCESS_KEY_ID, //Set these or have path variable
				secretAccessKey: '<%= env.AWSSecretKey %>' || process.env.AWS_SECRET_ACCESS_KEY,
				uploadConcurrency: 30
			},
      production:{
        options: {
          bucket:'<%= env.S3Bucket %>',
					region:'us-west-2'
        },
        files:[
          {'action': 'upload', expand: true, cwd: 'dev/', src: ['**'], dest: ''},
          // {'action': 'upload', expand: true, cwd: 'dist/', src: ['**'], dest: '<%= pkg.version %>'},
        ]
      },
      staging:{
				options: {
					bucket:'<%= env.S3Bucket %>',
					region:'us-west-2'
				},
        files:[
					// {'action': 'upload', expand: true, cwd: '<%= config.distFolder %>/', src: ['**'], dest: 'staging'},
				{'action': 'upload', expand: true, cwd: '<%= config.distFolder %>', src: ['**'], dest: 'staging/<%= pkg.version %>'}
        ]
      },
			images:{
				options: {
					bucket:'<%= env.S3CDNBucket %>',
				},
				files:[
					{'action': 'upload', expand: true, cwd: '<%= config.imageFolder %>', src: ['**'], dest: 'portfolio' , differential:true}
				]
			}
    },
		copy:{
			dist: {
				files: [
					{expand: true, cwd: './<%= config.devFolder %>/', src:'**', dest: '<%= config.distFolder %>/'},
					// {expand: true, cwd: './<%= config.devFolder %>/docs', src:'**', dest: '<%= config.distFolder %>/docs'}
				],
			}
		},
		ngAnnotate:{
			options: {
				// Task-specific options go here.
			},
			dist: {
				// Target-specific file lists and/or options go here.
				files:[{expand: true, src:['<%= config.distFolder %>/components/**/*.js', '<%= config.distFolder %>/js/**/*.js']}]
			},
		},
    uglify: {

	    dist: {
				options: {
					// mangle: false
				},
	      files: [{
	          expand: true,
	          cwd: '<%= config.distFolder %>',
	          src: 'components/**/*.js',
	          dest: '<%= config.distFolder %>'
	      }, {
	          expand: true,
	          cwd: '<%= config.distFolder %>',
	          src: 'js/**/*.js',
	          dest: '<%= config.distFolder %>'
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
	        '<%= config.distFolder %>/index.html': '<%= config.devFolder %>/index.html'   // 'destination': 'source'
	      }
	    },
	  },
	  cssmin: {
		  target: {
		    files: [{
		      expand: true,
		      cwd: '<%= config.devFolder %>/styles',
		      src: ['**/*.css', '!**/*.min.css'],
		      dest: '<%= config.distFolder %>/styles',
		    }]
		  }
		}
	});

	// Dependencies
	require('load-grunt-tasks')(grunt);
	// Default task
	grunt.registerTask( 'default', ['connect:dev', 'watch'] );

	// Theme task
	grunt.registerTask( 'themes', [ 'sass' ] );

	// Serve presentation locally
	grunt.registerTask( 'serve', [ 'connect:dev', 'watch' ] );

	grunt.registerTask( 'test', [ 'build', 'connect:dist', 'watch' ] );

	grunt.registerTask('images', ['aws_s3:images']);

	grunt.registerTask( 'build', ['copy', 'ngAnnotate', 'uglify:dist', 'htmlmin:dist', 'cssmin' ] );

  grunt.registerTask( 'stage', [ 'build', 'aws_s3:staging' ] );

  grunt.registerTask( 'release', [ 'build','uglify:dist','aws_s3:production'  ] );

};
