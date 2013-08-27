'use strict'

angular.module('topicoContentEditors').directive 'buttonToggle', ->
  restrict: 'A',
  require: 'ngModel',
  link: ($scope, element, attr, ctrl) ->
    classToToggle = attr.buttonToggle
    element.bind 'click', ->
      checked = ctrl.$viewValue
      $scope.$apply () ->
        ctrl.$setViewValue(!checked)
    $scope.$watch attr.ngModel, (nv, ov) ->
      if nv then element.addClass(classToToggle) else element.removeClass(classToToggle)