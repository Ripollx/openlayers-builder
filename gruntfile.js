var path = require('path');

/**
* The latest release.  Links to examples, doc, etc. will be prefixed by this
* value.
* @type {String}
*/
var latest = 'v' + require('./package.json').version;

/** @param {Object} grunt Grunt. */
module.exports = function(grunt) {

	var currentVersion = latest;

	var treeish = grunt.option('treeish') || process.env.treeish || 'origin/master';
	if (treeish === 'latest') {
		treeish = latest;
	}

	var branch = treeish.split('/').pop(); // may not always be a local branch

	// file patterns (these take / on win and *nix)
	var build = 'build';
	var dist = build + '/dist';
	var repo = build + '/repo';

	grunt.initConfig({
		checkout: {
			options: {
				repo: 'git://github.com/openlayers/openlayers.git',
				treeish: treeish,
				dir: repo
			}
		},
		install: {
			options: {
				dir: repo
			}
		},
		run: {
			options: {
				cwd: repo
			},
			ol: {
				exec: 'npm run build-legacy'
			}
		},
		clean: {
			dist: dist,
			repo: repo,
			all: build
		},
		copy: {
			src: {
				files: [{
					expand: true,
					cwd: 'src',
					src: '**',
					dest: repo + '/src/'
				}]
			},
			ol: {
				files: [{
					expand: true,
					cwd: repo + '/build/legacy/',
					src: '*.*',
					dest: dist + '/' + currentVersion + '-custom'
				}]
			}
		},
		move: {
			ol: {
				src: [
					repo + '/build/legacy/ol.js*',
					repo + '/build/legacy/ol.js.map'
				],
				dest: dist + '/en/' + branch + '/build/'
			},
			css: {
				src: [
					repo + '/build/legacy/ol.css*'
				],
				dest: dist + '/en/' + branch + '/css/'
			}
		}
	});

	grunt.loadTasks('tasks');

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-run');
	grunt.loadNpmTasks('grunt-move');

	grunt.registerTask('version', 'Get Openlayer version', function() {
		currentVersion = 'v' + require('./' + repo + '/package.json').version;
		console.log('version', currentVersion);
		grunt.config.merge({
			copy: {
				ol: {
					files: [{
						dest: dist + '/' + currentVersion + '-custom'
					}]
				}
			}
		});
	});

	grunt.registerTask('build', 'Build Custom Openlayers', [
		'checkout',
		'install',
		'version',
		'copy:src',
		'run:ol',
		'clean:dist',
		'copy:ol'
	//    'move'
	]);

	grunt.registerTask('default', 'build');

};
