angular.module('topicoContentEditors')
  .service 'topicoResourcesSvc', () ->
    list: ->
      [{id: 'first', type: 'note'},{id: 'second', type: 'task'}]
