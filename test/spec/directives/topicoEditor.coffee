'use strict'

describe 'Directive: topicoEditor', ($timeout) ->
  $rootScope = null
  $compile = null
  $timeout = null

  beforeEach module 'topicoContentEditors'
  beforeEach inject((_$rootScope_, _$compile_, _$timeout_) ->
    $rootScope = _$rootScope_
    $compile = _$compile_
    $timeout = _$timeout_
  )

  make = ->
    element = angular.element '<topico-editor markdown="markdown" html="html"></topico-editor>'
    element = $compile(element) $rootScope
    $timeout.flush()
    element.set = (v) ->
      @find('textarea').val(v)
      waits 1 # presumably just fine for listeners to run
    element


  it 'should output markdown', ->
    make().set('val')
    runs ->
      expect($rootScope.markdown).toBe 'val'

  it 'should output html', ->
    make().set('**strong text**')
    runs ->
      expect($rootScope.html).toBe '<p><strong>strong text</strong></p>'