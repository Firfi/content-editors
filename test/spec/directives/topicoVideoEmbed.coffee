'use strict'

describe 'Directive: topicoVideoEmbed', () ->
  res = {}
  $scope = null
  $compile = null
  beforeEach ->
    module 'topicoContentEditors'
    inject (_$rootScope_, _$compile_) ->
      $scope = _$rootScope_
      $compile = _$compile_
    res.youtube =
      "type": "Res"
      "desc": "Constructing solutions to systems of equations"
      "sourceId": "Z96vkuybvjE"
      "subType": "YouTube"
      "url": "http://www.youtube.com/watch?v=Z96vkuybvjE"
      "resSchemaName": "VIDEO"
      "id": "51fb288003644239e34d9bc1"
      "aboutTopicIds": []
      "aboutResIds": []
      "title": "Constructing solutions to systems of equations"
      "nonTopicAbouts": []
      "statements": [
        "predicate": "IS_ABOUT"
        "objectId": "51fb288003644239e34d9bb7"
      ]
    res.vimeo =
      "type": "Res"
      "desc": "<p><a href=\"http://vimeo.com/71336599\">The Thing About Dogs</a> from <a href=\"http://vimeo.com/danielkoren\">Daniel Koren</a> on <a href=\"https://vimeo.com\">Vimeo</a>.",
      "sourceId": "71336599"
      "subType": "Vimeo"
      "url": "http://vimeo.com/71336599"
      "resSchemaName": "VIDEO"
      "id": "51fb288003644239e34d9bc2"
      "aboutTopicIds": []
      "aboutResIds": []
      "title": "The Thing About Dogs"
      "nonTopicAbouts": []
      "statements": [
        "predicate": "IS_ABOUT"
        "objectId": "51fb288003644239e34d9bb7"
      ]

  element = {}

  make = (type) ->
    element = angular.element "<topico-video-embed res=\"#{type}\"></topico-video-embed>"
    $scope[type] = res[type]
    element = $compile(element) $scope
    $scope.$digest()
    element

  it 'should add youtube iframe', ->
    expect(make('youtube').children()[0].tagName.toLowerCase()).toEqual('iframe')

  it 'should add vimeo iframe', ->
    expect(make('vimeo').children()[0].tagName.toLowerCase()).toEqual('iframe')

  it 'youtube iframe should have youtube src', ->
    expect(make('youtube').children()[0].getAttribute('src')).toMatch(/youtube/)

  it 'vimeo iframe should have vimeo src', ->
    expect(make('vimeo').children()[0].getAttribute('src')).toMatch(/vimeo/)