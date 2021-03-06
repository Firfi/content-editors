
angular.module('topicoContentEditors', ['topicoAngularServiceApp', 'ui.bootstrap.modal']);

#angular.module('topicoContentEditors').config ($routeProvider) ->
#  $routeProvider.when('/', {
#    templateUrl : 'views/main.html',
#    controller : 'TopicoCEDevMainCtrl'
#  }).otherwise({
#    redirectTo : '/'
#  })

$.fn.getCursorPosition = ->
  input = jQuery(this).get(0)
  if document.selection
    input.focus()
    sel = document.selection.createRange()
    selLen = document.selection.createRange().text.length
    sel.moveStart('character', -input.value.length)
    sel.text.length - selLen
  else if input.selectionStart || input.selectionStart is '0'
    input.selectionStart
  else
    0
