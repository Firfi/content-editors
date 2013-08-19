'use strict';

# this service supposed to be private
# there is hight possibility of duplicate code in directives so we could put it here

angular.module('topicoContentEditors')
  .service 'topicoCEVideoSvc', ['topicoCESvc', (topicoCESvc) ->
    res: (scope, element, attrs) ->
      res = attrs.res
      res = scope.$eval(res) if typeof res is 'string'
      console.warn "res is not defined for element: #{ element[0].nodeName }" unless res
      res
    videoTypes:
      list: ['youtube', 'vimeo']
      validate: (subType) ->
        topicoCESvc.validate(subType, @list)
      subType: (res) ->
        subType = res.subType;
        try
          (subType = (m[0] for t in @list when m = res.url.match new RegExp(t, 'i'))[0]).toLowerCase()
        catch e then 'youtube'
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
  ]
