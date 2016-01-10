'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
			' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
		// Task configuration.
		/*concat: {
			options: {
				banner: '<%= banner %>',
				stripBanners: true
			},
			dist: {
				src: ['lib/<%= pkg.name %>.js'],
				dest: 'dist/<%= pkg.name %>.js'
			},
		},*/
		jasmine : {
			src : 'lib/**/*.js',
			options : {
				vendor: ['test/vendor/Sinon/sinon-1.14.1.js'],
				specs: 'test/spec/**/*.js',
				helpers: 'test/helpers/**/*.js',
				template: require('grunt-template-jasmine-requirejs'),
				templateOptions: {
					requireConfigFile: 'lib/js/main.js',
					requireConfig: {
						baseUrl: './lib/js/',
						paths: {
							'app': 'app',
							'router': 'router',
							'text': './text-master/text',
						}
					}
				}
			}
		},
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			gruntfile: {
				src: 'Gruntfile.js'
			},
			lib: {
				options: {
					jshintrc: 'lib/.jshintrc'
				},
				src: ['lib/**/*.js']
			}
		},
		requirejs: {
			compile: {
				options: {
					baseUrl: "./lib/js/",
					mainConfigFile: "lib/js/main.js",
					include: ['main'],
					out: "dist/js/<%= pkg.name %>.min.js"
				}
			}
		},
		sass: {
			dev: {
				options: {
					sourceMap: false
				},
				files: {
					'lib/style/css/<%= pkg.name %>-style.css': 'lib/scss/main.scss'
				}
			},
			dist: {
				options: {
					outputStyle: 'compressed',
					sourceMap: true
				},
				files: {
					'dist/style/css/<%= pkg.name %>-style.min.css': 'lib/scss/main.scss'
				}
			}
		},
		watch: {
			gruntfile: {
				files: '<%= jshint.gruntfile.src %>',
				tasks: ['jshint:gruntfile']
			},
			lib: {
				files: '<%= jshint.lib.src %>',
				tasks: ['jshint:lib', 'nodeunit']
			},
			test: {
				files: '<%= jshint.test.src %>',
				tasks: ['jshint:test', 'nodeunit']
			},
		},
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-sass');

	// Default task.
	grunt.registerTask('devsass', ['sass:dev']);
	grunt.registerTask('distsass', ['sass:dist']);
	grunt.registerTask('test', ['jshint', 'jasmine', 'devsass']);
	grunt.registerTask('mywatch', ['watch']);
	grunt.registerTask('default', ['jshint', 'requirejs', 'distsass']);

};
