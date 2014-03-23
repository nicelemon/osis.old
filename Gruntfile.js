module.exports = function(grunt) {

  // require all the tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
 
  // configure the tasks
  grunt.initConfig({
 
    copy: {
      build: {
        cwd: 'source',
        src: ['**'],
        dest: 'build',
        expand: true
      },
    },

    clean: {
      build: {
        src: ['build']
      },
    },

    less: {
      dist: {
        options: {
          compress: true,
          cleancss: true,
          optimization: 2,
          // paths: ['source/assets/less']
        },
        files: {
	  'source/assets/css/osis.css': 'source/assets/less/osis.less'
        }
      }
    },

    uglify: {
      build: {
        options: {
          mangle: false
        },
        files: {
          'build/osis.js': [ 'source/**/*.js' ]
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      styles: {
        // Which files to watch (all .less files recursively in the less directory)
        files: ['source/assets/less/*.less'],
        tasks: ['less'],
      },
      copy: {
        files: ['source/**'],
        tasks: ['copy']
      }
    }
 
  });
 
  // define the tasks
  grunt.registerTask('build', [ 
    'less:dist',
    'clean', 
    'copy',
    'watch'
  ]);

  // define default task
  grunt.registerTask('default', ['build']);

};
