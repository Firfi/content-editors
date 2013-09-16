'use strict';

angular.module('topicoContentEditors').service 'topicoPopupContentSvc', ['topicoResourcesService', (topicoResourcesService) ->
  c = null
  initContent = ->
    c = topicoResourcesService.getTasks()
  initContent()

  content: ->
    c
  refresh: initContent()
]