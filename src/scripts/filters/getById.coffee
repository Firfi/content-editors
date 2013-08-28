angular.module('topicoContentEditors').filter 'getById', ->
  (input, id) ->
    for o in input
      if o.id is id
        return o