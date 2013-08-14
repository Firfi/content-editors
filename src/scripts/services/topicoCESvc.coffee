'use strict';

# this service supposed to be private
# there is hight possibility of duplicate code in directives so we could put it here

angular.module('topicoContentEditorsApp')
  .service 'topicoCESvc', () ->
    validate = (subType, types) ->
      subType = try subType.toLowerCase() catch e then null
      if subType not in types
        "subtype #{ subType } is not valid. valid subtypes: #{ types }"
      else
        true
    sub = (res) ->
      subType = res.subType; subType ?= (m[0] for t in videoTypes when m = res.url.match new RegExp(t, 'i'))[0]
      try subType.toLowerCase() catch e then 'youtube'
    videoTypes = ['youtube', 'vimeo']
    {
      res: (scope, element, attrs) ->
        res = attrs.res
        res = scope.$eval(res) if typeof res is 'string'
        console.warn "res is not defined for element: #{ element[0].nodeName }" unless res
        res
      videoTypes:
        list: videoTypes
        validate: (subType) ->
          validate(subType, videoTypes)
        subType: sub
        config: (res) ->
          getUrl = () ->
            embed = {
              youtube: 'embed'
              vimeo: 'video'
            }[sub(res)]
            "#{location.protocol}//#{sub(res)}.com/#{embed}/#{res.sourceId}"
          url = res.url ? getUrl()
          url = url.replace /watch\?v=/, 'embed/'
          src: url
          width: res.width
          height: res.height
    }

