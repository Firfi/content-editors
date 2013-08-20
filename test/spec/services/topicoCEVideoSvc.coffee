'use strict'

describe 'Service: topicoCEVideoSvc', () ->

  youtubeRes = null
  vimeoRes = null
  # load the service's module
  beforeEach ->
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

  # instantiate service
  topicoCEVideoSvc = {}
  beforeEach inject (_topicoCEVideoSvc_) ->
    topicoCEVideoSvc = _topicoCEVideoSvc_

  it 'should permit youtube subtype', () ->
    expect(topicoCEVideoSvc.videoTypes.validate('youtube')).toBe true;

  it 'should not permit zooporn subtype', () ->
    expect(topicoCEVideoSvc.videoTypes.validate('zooporn')).toMatch /not valid/

  it 'should detect youtubeRes subtype as youtube', ->
    expect(topicoCEVideoSvc.videoTypes.subType(youtubeRes)).toBe('youtube')

  it 'should detect youtubeRes without subtype field subtype as youtube', ->
    expect(topicoCEVideoSvc.videoTypes.subType(youtubeRes.without('subType'))).toBe('youtube')

  it 'should detect youtubeRes without subtype field and url field subtype as youtube', ->
    expect(topicoCEVideoSvc.videoTypes.subType(youtubeRes.without('subType', 'url'))).toBe('youtube')

  it 'should detect vimeoRes subtype as vimeo', ->
    expect(topicoCEVideoSvc.videoTypes.subType(vimeoRes)).toBe('vimeo')

  it 'should detect vimeoRes without subtype field subtype as vimeo', ->
    expect(topicoCEVideoSvc.videoTypes.subType(vimeoRes.without('subType'))).toBe('vimeo')

  it 'should detect vimeoRes without subtype field and url field subtype as youtube', ->
    expect(topicoCEVideoSvc.videoTypes.subType(vimeoRes.without('subType', 'url'))).toBe('youtube')

  it 'should produce valid youtube url', ->
    expect(topicoCEVideoSvc.videoTypes.config(youtubeRes).src).toBe('http://youtube.com/embed/Z96vkuybvjE')

  it 'should produce valid vimeo url', ->
    expect(topicoCEVideoSvc.videoTypes.config(vimeoRes).src).toBe('http://player.vimeo.com/video/71336599?title=0&amp;byline=0&amp;portrait=0&amp;badge=0')

