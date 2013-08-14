'use strict';

angular.module('topicoContentEditorsApp')
  .directive('topicoVideoEmbed', () ->
    template: '<div></div>'
    restrict: 'E'
    link: (scope, element, attrs) ->
      types = ['youtube', 'vimeo']
      res = attrs.res
      res = scope.$eval(res) if typeof res is 'string'
      console.warn "res is not defined for element: #{ element[0].nodeName }"; return unless res # TODO TESTS
      subType = res.subType
      subType ?= (m[0] for t in types when m = res.url.match new RegExp(t, 'i'))[0]
      subType = subType.toLowerCase()
      validate = () ->
        if not subType in types
          "subtype is not valid. valid subtypes: #{ types }"
        else
          true
      if err = validate() isnt true
        element.text ''
        console.warn err
      else
        element.text 'valid'

  )
