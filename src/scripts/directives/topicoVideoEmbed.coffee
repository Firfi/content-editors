'use strict';

angular.module('topicoContentEditorsApp')
  .directive('topicoVideoEmbed', ['topicoCESvc', (topicoCESvc) ->
    template: '<iframe width="{{ config.width }}" height="{{ config.height }}" src="{{ config.src }}" frameborder="0" allowfullscreen></iframe>'
    restrict: 'E'
    link: (scope, element, attrs) ->
      types = topicoCESvc.videoTypes
      res = topicoCESvc.res(scope, element, attrs)
      if (err = types.validate(res.subType)) isnt true
        element.text ''
        console.warn err
      else
        scope.config = types.config(res)

  ])
