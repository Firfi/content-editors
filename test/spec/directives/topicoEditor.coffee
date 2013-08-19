'use strict'

describe 'Directive: topicoEditor', () ->
  beforeEach module 'topicoContentEditors'

  element = {}

  it 'should make hidden element visible', inject ($rootScope, $compile) ->
    $rootScope.markdown = '1'
    $rootScope.html = '2'
    element = angular.element '<topico-editor markdown="markdown" html="html"></topico-editor>'
    element = $compile(element) $rootScope
    expect(element.text()).toBe 'this is the topicoEditor directive'
