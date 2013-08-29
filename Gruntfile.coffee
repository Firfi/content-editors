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
    dist: 'dist'
    temp: '.temp'

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
          '<%= yeoman.app %>/{images,img}/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
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
              mountFolder(connect, 'dist')
              mountFolder(connect, yeomanConfig.app)
            ]
      test:
        options:
          middleware: (connect) ->
            [
              mountFolder(connect, 'dist')
              mountFolder(connect, 'test')
            ]
      dev:
        options:
          middleware: (connect) ->
            [
              mountFolder(connect, 'dist')
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
      server: yeomanConfig.dist
    copy:
      imgsDev:
        files: [
          flatten: true
          expand: true
          src: "#{yeomanConfig.app}/bower_components/pagedown-bootstrap/img/*"
          dest: "#{yeomanConfig.app}/img/"
          filter: 'isFile'
        ]
      imgs:
        files: [
          flatten: true
          expand: true
          src: "#{yeomanConfig.app}/img/*"
          dest: "#{yeomanConfig.dist}/img"
        ]
      views:
        files: [
          cwd: "#{yeomanConfig.app}/views"
          expand: true
          src: ["**"]
          dest: "#{yeomanConfig.dist}/views/"
        ]
      pluginsSrc:
        files: [
          src: "#{yeomanConfig.dist}/scripts/plugins.js"
          dest: "#{yeomanConfig.dist}/scripts/plugins.src.js"
        ]


    useminPrepare:
      html: '<%= yeoman.app %>/index.html',
      options:
        dest: '<%= yeoman.dist %>'

    usemin:
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options:
        dirs: ['<%= yeoman.dist %>']

  # Compile CoffeeScript (.coffee) files to JavaScript (.js).
    coffee:
      scripts:
        files: [
          cwd: './src/'
          src: ['scripts/**/*.coffee', 'scripts/init.coffee']
          dest: './.temp/'
          expand: true
          ext: '.js'
        ]
        options:
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
      js:
        files: [
            {
              src: "#{yeomanConfig.dist}/scripts/scripts.src.js"
              dest: "#{yeomanConfig.dist}/scripts/scripts.js"
            }, {
              src: "#{yeomanConfig.dist}/scripts/plugins.src.js"
              dest: "#{yeomanConfig.dist}/scripts/plugins.js"
            }
          ]
        options:
          banner: '<%= banner %>'
          sourceMap: (fileName) ->
            fileName.replace /\.js$/, '.map'
          preserveComments: 'all'

    concat:
      js:
        src: ['.temp/scripts/*.js', '.temp/scripts/**/*.js']
        dest: "#{yeomanConfig.dist}/scripts/scripts.src.js"

    cssmin:
      css:
        expand: true
        files:
          'main.css': ['main.css']
        options:
          banner: '<%= banner %>'

    ngtemplates:
      dist:
        options:
          base: "#{yeomanConfig.app}/views"
          concat: "js"
          module: 'topicoContentEditors'
        src: "#{yeomanConfig.app}/views/{,**/}**.html",
        dest: "#{yeomanConfig.temp}/scripts/templates.js"
      test:
        options:
          base: "#{yeomanConfig.app}/views"
          module: 'topicoContentEditors'
        src: "#{yeomanConfig.app}/views/{,**/}**.html",
        dest: "#{yeomanConfig.temp}/scripts/templates.js"

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
    'coffee:scripts'
    'coffee:test'
    'connect:test'
    'ngtemplates:test'
    'useminPrepare' # for karma dependencies
    'concat' # same
    'karma'
  ]

  grunt.registerTask 'dev', [
    'clean'
    'coffee'
    #'jade'
    'ngtemplates:dist'
    'concat'
    #'less'
    'copy:imgsDev'
    'copy:imgs'
    'copy:pluginsSrc'
    'copy:views'
  ]

  grunt.registerTask 'default', [
    'useminPrepare'
    'dev'
    'uglify'
    'cssmin'
    'usemin'
  ]