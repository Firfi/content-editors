'use strict';

# this service supposed to be private
# there is hight possibility of duplicate code in directives so we could put it here

angular.module('topicoContentEditors')
  .service 'topicoCEVideoSvc', ['topicoCESvc', (topicoCESvc) ->
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
        subtype = @subType(res)
        width = {
          youtube: 838
          vimeo: 500
        }[subtype]
        height = {
          youtube: 480
          vimeo: 281
        }[subtype]
        getUrl = ->
          embed = {
            youtube: 'embed'
            vimeo: 'video'
          }[subtype]
          subdomain = {
            youtube: ''
            vimeo: 'player.'
          }[subtype]
          query = {
            youtube: ''
            vimeo: "?title=0&amp;byline=0&amp;portrait=0&amp;badge=0"
          }[subtype]
          "#{location.protocol}//#{subdomain}#{subtype}.com/#{embed}/#{res.sourceId}#{query}"
        url = getUrl() ? res.url
        url = url.replace /watch\?v=/, 'embed/'

        src: url
        width: res.width ? width
        height: res.height ? height
        frameborder: 0
        desc: res.desc ? ''
  ]
