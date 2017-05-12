module.exports = function(grunt) {
 
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    compass: {
        dist: {        
          options: {      
            sassDir: 'src/scss',
            cssDir: 'src/css',
            environment: 'production'
          }
        },
        dev: {              
          options: {
            sassDir: 'src/scss',
            cssDir: 'src/css'
          }
        }
    },
 
    watch: {
        sass:{
            files: ['src/scss/style.scss'],
            tasks: ['sass', 'cssmin']
        }
    },
 
    sass: {
        dist: {
            files: {
                'src/css/style.css' : 'src/scss/style.scss'
            }
        }
    },
    cssmin:{
        my_target:{
            files: { 'dist/css/guestbook.min.css':'src/css/*.css'}
        }
    }
 
  });


  // Load the plugin that provides the "compass" task.
  grunt.loadNpmTasks('grunt-contrib-compass');
 
     // Load the plugin that provides the "watch" task.
  grunt.loadNpmTasks('grunt-contrib-watch');
 
     // Load the plugin that provides the "sass" task.
  grunt.loadNpmTasks('grunt-contrib-sass');
 
   // Load the plugin that provides the "cssmin" task.
  grunt.loadNpmTasks('grunt-contrib-cssmin');
 
   // Default task(s).
  grunt.registerTask('default', ['sass', 'cssmin', 'watch']);
};