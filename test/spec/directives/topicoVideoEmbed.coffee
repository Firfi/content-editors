'use strict'

describe 'Directive: topicoVideoEmbed', () ->
  beforeEach module 'topicoContentEditors'

  element = {}

  it 'should do something', inject ($rootScope, $compile) ->
    element = angular.element '<topico-video-embed></topico-video-embed>'
    element = $compile(element) $rootScope
    expect(element.text()).toBe 'this is the topico-video-embed directive'
