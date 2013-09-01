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
    'angular-cookies': 'bower_components/angular-cookies/angular-cookies',
    'angular-mocks': 'bower_components/angular-mocks/angular-mocks',
    'angular-resource': 'bower_components/angular-resource/angular-resource',
    'angular-sanitize': 'bower_components/angular-sanitize/angular-sanitize',
    'angular-scenario': 'bower_components/angular-scenario/angular-scenario',
    angular: 'bower_components/angular/angular',
    'es5-shim': 'bower_components/es5-shim/es5-shim',
    'jasmine-query': 'bower_components/jasmine-query/lib/jasmine-jquery',
    jquery: 'bower_components/jquery/jquery',
    json3: 'bower_components/json3/build',
    underscore: 'bower_components/underscore/underscore',
    app: 'bower_components/topicoAngularService/app/scripts/app',
    topicoResourcesService: 'bower_components/topicoAngularService/app/scripts/services/topicoResourcesService'
  }
});
