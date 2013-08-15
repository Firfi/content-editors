'use strict'

describe 'Service: topicoCESvc', () ->

  # load the service's module
  beforeEach module 'topicoContentEditors'

  # instantiate service
  topicoCESvc = {}
  beforeEach inject (_topicoCESvc_) ->
    topicoCESvc = _topicoCESvc_

  it 'should do something', () ->
    expect(!!topicoCESvc).toBe true;
