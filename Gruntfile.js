'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg: grunt.file.readJSON('package.json'),
		banner: '/**/n' +
			' * @licence <%= pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			' * <%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
			' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
			' * Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n' +
			' * you may not use this file except in compliance with the License.\n' +
			' * You may obtain a copy of the License at\n * \n' +
			' * http://www.apache.org/licenses/LICENSE-2.0\n * \n' +
			' * Unless required by applicable law or agreed to in writing, software\n' +
			' * distributed under the License is distributed on an "AS IS" BASIS,\n' +
			' * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n' +
			' * See the License for the specific language governing permissions and\n' +
			' * limitations under the License.\n' +
			' */',

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
				vendor: [
					'test/vendor/Sinon/sinon-1.14.1.js',
					'test/vendor/jasmine-jquery-master/vendor/jquery/jquery.js',
					//'test/vendor/jasmine-jquery-master/lib/jasmine-jquery.js'
				],
				//specs: ['test/spec/test-model.js', 'test/spec/test-collection.js'],
				specs: ['test/spec/test-model.js'],
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
					out: "dist/js/<%= pkg.name %>.min.js",
					/* excluding so licence agreements are included in the compiled code */
					/*optimize: "uglify2",
					preserveLicenseComments: false,
					generateSourceMaps: true,*/
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
		copy: {
			main: {
				files: [
					{
						cwd: 'lib/style/fonts/Raleway/', src: ['Raleway-Regular.ttf'], dest: 'dist/style/fonts/Raleway/', expand: true
					},
					/*{
						cwd: 'lib/style/images/svg/', src: ['*.svg'], dest: 'dist/style/images/svg/', expand: true
					},*/
					{
						cwd: 'lib/style/images/', src: ['**/*.png'], dest: 'dist/style/images/', expand: true
					},
				]
			},
			dist: {
				files: [
					{
						cwd: 'dist/',  // set working folder / root to copy
						src: ['**/*.*'],           // copy all files and subfolders
						dest: '../../Wordpress/ajmebc-gobi-animating-montage/ajmebc-gobi-animating-montage/public/ajmebc/dist/',    // destination folder
						expand: true           // required when using cwd
					}
				]
			}
		},

		watch: {
			/*gruntfile: {
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
			},*/
			styles: {
				files: ['lib/scss/**/*.scss'], // which files to watch
				tasks: ['sass:dev'],
				options: {
					nospawn: true
				}
			}
		},
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-copy');

	// Default task.
	grunt.registerTask('devsass', ['sass:dev']);
	grunt.registerTask('test', ['jshint', 'jasmine', 'devsass']);
	grunt.registerTask('distsass', ['sass:dist']);
	grunt.registerTask('default', ['jshint', 'jasmine', 'requirejs', 'distsass', 'copy']);
	grunt.registerTask('mywatch', ['watch']);
	grunt.registerTask('dist', ['default', 'copy:dist']);

};
