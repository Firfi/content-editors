'use strict'

describe 'Directive: topicoVideoEmbed', () ->
  youtubeRes = null
  vimeoRes = null
  beforeEach =>
    module 'topicoContentEditors'
    youtubeRes =
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
    vimeoRes =
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

  it 'should add youtube iframe', inject ($rootScope, $compile) ->
    element = angular.element '<topico-video-embed res="youtube"></topico-video-embed>'
    $rootScope.youtube = youtubeRes

    element = $compile(element) $rootScope
    expect(element.prop('tagName').toLowerCase()).toEqual('iframe')

  it 'should add vimeo iframe', inject ($rootScope, $compile) ->
    element = angular.element '<topico-video-embed res="vimeo"></topico-video-embed>'
    $rootScope.vimeo = vimeoRes

    element = $compile(element) $rootScope
    expect(element.prop('tagName').toLowerCase()).toEqual('iframe')