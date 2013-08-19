'use strict';

angular.module('topicoContentEditors')
  .directive('topicoVideoEmbed', ['topicoCEVideoSvc', (topicoCEVideoSvc) ->
    template: '''<div class="topico-embed-video">
              <iframe

              width="{{ config.width }}"
              height="{{ config.height }}"
              src="{{ config.src }}"
              frameborder="{{ config.frameborder }}"
              webkitAllowFullScreen mozallowfullscreen allowFullScreen>

              </iframe>
              <div ng-bind-html-unsafe="config.desc"></div>
              </div>
              '''
    restrict: 'E'
    scope:
      res: '='
    replace: true
    link: (scope, element, attrs) ->
      types = topicoCEVideoSvc.videoTypes
      res = scope.res
      if (err = types.validate(res.subType)) isnt true
        element.text ''
        console.warn err
      else
        scope.config = types.config(res)
  ])
