'use strict'

describe 'Directive: topicoEditor', () ->
  beforeEach module 'topicoContentEditors'

  element = {}

  it 'should make hidden element visible', inject ($rootScope, $compile) ->
    element = angular.element '<topico-editor></topico-editor>'
    element = $compile(element) $rootScope
    expect(element.text()).toBe 'this is the topicoEditor directive'
