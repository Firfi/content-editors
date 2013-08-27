angular.module('topicoContentEditors', ['topicoAngularServiceApp']);

jQuery.fn.getCursorPosition = ->
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
