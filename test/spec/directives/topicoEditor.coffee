'use strict'

describe 'Directive: topicoEditor', ->
  $rootScope = null
  $compile = null
  $timeout = null
  $httpBackend = null
  TasksJSON = null
  $q = null

  beforeEach ->

    module 'mockedServices'

    module 'topicoContentEditors', ($provide) ->
      $provide.decorator 'topicoResourcesService', ($delegate) ->
        $delegate.getTasks = ->
          p = $q.defer()
          $timeout ->
            p.resolve(TasksJSON)
          p.promise
        $delegate

    inject (_$rootScope_, _$compile_, _$timeout_, _$httpBackend_, _TasksJSON_, _$q_) ->
      $rootScope = _$rootScope_
      $compile = _$compile_
      $timeout = _$timeout_
      $httpBackend = _$httpBackend_

      TasksJSON = _TasksJSON_

      $q = _$q_



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

  it 'should have the include button', ->
    expect(make().html()).toContain('wmd-include-link-0')

  it 'should fetch data', ->
    rs = make().scope().resources
    expect(rs.length).toBe(3)

  it 'should hide unchecked types', ->
    s = make().scope()
    ts = s.types
    lt = _.find ts, (o) ->
      o.name == 'Link'
    s.$apply ->
      lt.checked = true
    st = s.selectedTypes()
    expect(st.length).toBe(1)
    rs = s.selectedResources()
    expect(rs.length).toBe(1) # 1 link

  it 'should apply text filter', ->
    s = make().scope()
    s.$apply ->
      s.filters.title = 'title 1'
      rs = s.selectedResources()
      expect(rs.length).toBe(2) # 1 link and 1 task

  it 'should include resource in existing text', ->
    e = make()
    s = e.scope()
    s.$apply ->
      s.popupState =
        text: 'existing__text'
        carret: 9
    s.includeResource('521d0bc90cf238a6d6bb5810')
    expect(s.popupState.text).toBe('existing_{{include 521d0bc90cf238a6d6bb5810}}_text')