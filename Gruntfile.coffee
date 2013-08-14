path = require 'path'

LIVERELOAD_PORT = 35729;
lrSnippet = require('connect-livereload')( port: LIVERELOAD_PORT )
mountFolder = (connect, dir) ->
  connect.static(require('path').resolve(dir))

# Build configurations.
module.exports = (grunt) ->

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  yeomanConfig =
    app: 'src'
    dev: 'dev'

  try
    yeomanConfig.app = require('./bower.json').appPath || yeomanConfig.app
  catch e

  grunt.initConfig
    pkg: grunt.file.readJSON('bower.json')
    banner: '/*! v<%= pkg.version %> */\n'
    yeoman: yeomanConfig

    watch:
      coffee:
        files: ['<%= yeoman.app %>/scripts/{,*/}*.coffee']
        tasks: ['coffee:scripts']
      coffeeTest:
        files: ['test/spec/{,*/}*.coffee']
        tasks: ['coffee:test']
      livereload:
        options:
          livereload: LIVERELOAD_PORT
        files: [
          '<%= yeoman.app %>/{,*/}*.html'
          '{.temp,<%= yeoman.app %>}/styles/{,*/}*.css'
          '{.temp,<%= yeoman.app %>}/scripts/{,*/}*.js'
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]

    connect:
      options:
        port: 9000
        hostname: 'localhost'
      livereload:
        options:
          middleware: (connect) ->
            [
              lrSnippet
              mountFolder(connect, '.temp')
              mountFolder(connect, yeomanConfig.app)
            ]
      test:
        options:
          middleware: (connect) ->
            [
              mountFolder(connect, '.temp')
              mountFolder(connect, 'test')
            ]
      dev:
        options:
          middleware: (connect) ->
            [
              mountFolder(connect, '.temp')
            ]
    open:
      server:
        url: 'http://localhost:<%= connect.options.port %>'

  # Deletes built file and temp directories.
    clean:
      working:
        src: [
          'topico-content-editors.*'
          './.temp/views'
          './.temp/'
        ]
      server: '.temp'
    copy:
      styles:
        files: [
          src: './src/styles/main.css'
          dest: './topico-content-editors.css'
        ]

  # Compile CoffeeScript (.coffee) files to JavaScript (.js).
    coffee:
      scripts:
        files: [
          cwd: './src/'
          src: 'scripts/**/*.coffee'
          dest: './.temp/'
          expand: true
          ext: '.js'
        ]
        options:
        # Don't include a surrounding Immediately-Invoked Function Expression (IIFE) in the compiled output.
        # For more information on IIFEs, please visit http://benalman.com/news/2010/11/immediately-invoked-function-expression/
          bare: true
          sourceMap: true
          sourceRoot : '/src'

      test: 
        files: [
          expand: true,
          cwd: 'test/spec',
          src: '{,*/}*.coffee',
          dest: '.temp/spec',
          ext: '.js'
        ]
    uglify:
    # concat js files before minification
      js:
        src: ['topico-content-editors.src.js']
        dest: 'topico-content-editors.js'
        options:
          banner: '<%= banner %>'
          sourceMap: (fileName) ->
            fileName.replace /\.js$/, '.map'
    concat:
    # concat js files before minification
      js:
        src: ['.temp/scripts/*.js', '.temp/scripts/**/*.js']
        dest: 'topico-content-editors.src.js'

    cssmin:
      css:
        files:
          'topico-content-editors.css': 'topico-content-editors.css'
        options:
          banner: '<%= banner %>'


    ngTemplateCache:
      views:
        files:
          './.temp/scripts/views.js': './.temp/topico-content-editors/**/*.html'
        options:
          trim: './.temp/'
          module: 'ngTable'

    karma:
      unit:
        configFile: 'karma.conf.js',
        singleRun: true


#  # Register grunt tasks supplied by grunt-contrib-*.
#  # Referenced in package.json.
#  # https://github.com/gruntjs/grunt-contrib
#  grunt.loadNpmTasks 'grunt-contrib-clean'
#  grunt.loadNpmTasks 'grunt-contrib-coffee'
#  grunt.loadNpmTasks 'grunt-contrib-copy'
#  grunt.loadNpmTasks 'grunt-contrib-cssmin'
#  grunt.loadNpmTasks 'grunt-contrib-uglify'
#  grunt.loadNpmTasks 'grunt-contrib-concat'


  # Register grunt tasks supplied by grunt-hustler.
  # Referenced in package.json.
  # https://github.com/CaryLandholt/grunt-hustler
  #grunt.loadNpmTasks 'grunt-hustler'

  grunt.registerTask 'server', (target) ->
    if (target is 'dev')
      grunt.task.run(['build', 'open', 'connect:dev:keepalive'])
    else
      grunt.task.run [
        'clean:server'
        'coffee:scripts'
        'connect:livereload'
        'open'
        'watch'
      ]

  grunt.registerTask 'test', [
    'clean:server'
    'coffee:test'
    'connect:test'
    'karma'
  ]

  grunt.registerTask 'dev', [
    'clean'
    'coffee'
    #'jade'
    #'ngTemplateCache'
    'concat'
    #'less'
    'copy'
  ]

  grunt.registerTask 'default', [
    'dev'
    'uglify'
    'cssmin'
  ]