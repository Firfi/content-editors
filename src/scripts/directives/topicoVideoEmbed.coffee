'use strict';

angular.module('topicoContentEditors')
  .directive('topicoVideoEmbed', ['topicoCEVideoSvc', (topicoCEVideoSvc) ->
    template: '<iframe width="{{ config.width }}" height="{{ config.height }}" src="{{ config.src }}" frameborder="0" allowfullscreen></iframe>'
    restrict: 'E'
    replace: true
    link: (scope, element, attrs) ->
      types = topicoCEVideoSvc.videoTypes
      res = topicoCEVideoSvc.res(scope, element, attrs)
      if (err = types.validate(res.subType)) isnt true
        element.text ''
        console.warn err
      else
        scope.config = types.config(res)
  ])
