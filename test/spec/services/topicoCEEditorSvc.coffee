'use strict'

describe 'Service: topicoCEEditorSvc', () ->

  # load the service's module
  beforeEach module 'topicoContentEditorsApp'

  # instantiate service
  topicoCEEditorSvc = {}
  beforeEach inject (_topicoCEEditorSvc_) ->
    topicoCEEditorSvc = _topicoCEEditorSvc_

  it 'should do something', () ->
    expect(!!topicoCEEditorSvc).toBe true;
