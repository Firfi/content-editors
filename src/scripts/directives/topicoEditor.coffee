'use strict';

angular.module('topicoContentEditors')
  .directive('topicoEditor', ['topicoCEEditorSvc', '$compile', (topicoCEEditorSvc, $compile) ->

    nextId = 0;

    template:'<div class="pagedown-bootstrap-editor"></div>'
    replace: true
    restrict: 'E'
    scope:
      markdown: '='
      html: '='
    link: (scope, element, attrs) ->
      editorUniqueId = nextId++

      newElement = $compile('<div>'+
      '<div class="wmd-panel">'+
      '<div id="wmd-button-bar-'+editorUniqueId+'"></div>'+
      '<textarea class="wmd-input" id="wmd-input-'+editorUniqueId+'">'+
      '</textarea>'+
      '</div>'+
      '<div id="wmd-preview-'+editorUniqueId+'" class="wmd-panel wmd-preview"></div>'+
      '</div>')(scope)

      element.html(newElement)

      converter = new Markdown.Converter()

      help = ->
        alert("help?")

      editor = new Markdown.Editor(converter, "-"+editorUniqueId, handler: help)

      editor.run();

      # better keep hooks after editor.run()

      isPreviewRefresh = false

      converter.hooks.chain("preConversion", (markdown) ->
        scope.markdown = markdown
        markdown
      )

      converter.hooks.chain("postConversion", (html) ->
        scope.html = html
        html
      )

      editor.hooks.chain("onPreviewRefresh", ->
        unless isPreviewRefresh
          scope.$apply()
      )

      $wmdInput = $("#wmd-input-"+editorUniqueId)

      scope.$watch('markdown', (value,oldValue) ->
        $wmdInput.val(value)
        isPreviewRefresh = true
        editor.refreshPreview()
        isPreviewRefresh = false
      )
  ])

