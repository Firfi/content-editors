requirejs.config({
  baseUrl: './',
  shim: {
    angular: {
      exports: 'angular'
    },
    angularRoute: [
      'angular'
    ],
    angularMocks: {
      deps: [
        'angular'
      ],
      exports: 'angular.mock'
    }
  },
  priority: [
    'angular'
  ],
  paths: {
    'topico-ce-f5ff-main': 'scripts/controllers/main',
    'topico-ce-f5ff-app': 'scripts/app',
    'angular-cookies': 'bower_components/angular-cookies/angular-cookies',
    'angular-mocks': 'bower_components/angular-mocks/angular-mocks',
    'angular-resource': 'bower_components/angular-resource/angular-resource',
    'angular-sanitize': 'bower_components/angular-sanitize/angular-sanitize',
    'angular-scenario': 'bower_components/angular-scenario/angular-scenario',
    'es5-shim': 'bower_components/es5-shim/es5-shim',
    angular: 'bower_components/angular/angular',
    json3: 'bower_components/json3/build',
    jquery: 'bower_components/jquery/jquery',
    'topico-ce-init': 'bower_components/topico-content-editors/dist/scripts/init',
    requirejs: 'bower_components/requirejs/require',
    underscore: 'bower_components/underscore/underscore'
  }
});

require( [
  'angular',
  'topico-ce-f5ff-app'
], function(angular, app) {
  'use strict';
  var $html = angular.element(document.getElementsByTagName('html')[0]);

  angular.element().ready(function() {
    $html.addClass('ng-app');
    angular.bootstrap($html, [app['name']]);
  });
});