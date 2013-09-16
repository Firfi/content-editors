'use strict'

angular.module('topicoContentEditors').directive 'lazy', ($compile) ->
  restrict: 'E'
  scope:
    renderIf: '='
  compile: (e) ->
    html = e.html()
    e.html('')
    (scope, element, attrs) ->
      unwatch = null
      render = ->
        IF = scope.renderIf
        if IF
          unwatch() if unwatch
          element.html $compile($.trim(html))(scope.$parent)
      unwatch = scope.$watch 'renderIf', ->
        render()