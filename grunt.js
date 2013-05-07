module.exports = function(grunt) {

  "use strict";

  // Project configuration.
  grunt.initConfig({

    // Standard tasks
    //---------------

    pkg: '<json:package.json>',
    test: {
      files: ['test/**/*.js']
    },
    lint: {
      files: ['grunt.js', 'app.js', 'test/**/*.js', 'modules/**/*.js']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'default'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true
      },
      globals: {
        exports: true
      }
    },
    min: {
      dist: {
        src: ['app.js', 'modules/*.js'],
        dest: 'dist/built.min.js'
      }
    },

    // Plugin tasks
    //-------------

    doccoh: {
      src: ['*.js', 'node_modules/helpers/*.js']
    },

    clean: {
      folder: "docs/"
    },

    // Run arbitrary command using grunt-exec
    exec: { 
      run: {
        command: 'node app.js',
        stdout: true
      },
      debug: {
        command : 'node --debug app.js',
        stdout: true
      },
      inspector: {
        command: 'node-inspector &',
        stdout: true
      }
    }

  });

  // grunt plugins
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-doccoh');
  grunt.loadNpmTasks('grunt-clean');

  // Default task.
  grunt.registerTask('default', 'clean lint test doccoh');


};