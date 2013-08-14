'use strict';

angular.module('topicoContentEditorsApp')
  .service 'topicoCESvc', () ->
    validate: (subType, types) ->
      subType = try subType.toLowerCase() catch e then null
      if subType not in types
        "subtype #{ subType } is not valid. valid subtypes: #{ types }"
      else
        true
