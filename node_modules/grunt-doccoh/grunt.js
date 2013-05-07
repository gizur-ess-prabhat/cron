module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-contrib-clean');

  // Project configuration.
  grunt.initConfig({
    test: {
      files: ['test/**/*.js']
    },
    lint: {
      files: ['grunt.js', 'tasks/**/*.js', 'test/**/*.js']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'default'
    },
    clean: {
      app: {
        src: ["docs"]
      }
    },
    doccoh: {
      app: {
        src: ['*js', 'tasks/**/*js', 'test/**/*js']
      }
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
        node: true,
        es5: true
      },
      globals: {}
    }
  });

  grunt.registerTask("default", "lint");
  grunt.registerTask("doc", "clean doccoh");
  grunt.loadTasks("tasks");

};
