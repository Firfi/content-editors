'use strict';

angular.module('topicoContentEditors')
  .directive('topicoEditor', ['topicoCEEditorSvc', '$compile', '$timeout', (topicoCEEditorSvc, $compile, $timeout) ->

    nextId = 0;

    template: '''<div class="pagedown-bootstrap-editor">
              <div>
                <div class="wmd-panel-{{ editorUniqueId }}">
                  <div id="wmd-button-bar-{{ editorUniqueId }}">
                    <textarea class="wmd-input" id="wmd-input-{{ editorUniqueId }}"></textarea>
                  </div>
                  <div id="wmd-preview-{{ editorUniqueId }}" class="wmd-panel wmd-preview"></div>
                </div>
              </div>
             </div>'''
    replace: true
    restrict: 'E'
    scope:
      markdown: '='
      html: '='
    link: (scope, element, attrs) ->
      scope.editorUniqueId = nextId++

      # works that way with dom manipulation inside link function in tests
      $timeout () ->

        converter = new Markdown.Converter()

        help = ->
          alert("Topico markdown editor")

        editor = new Markdown.Editor(converter, "-"+scope.editorUniqueId, handler: help)

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

        $wmdInput = $("#wmd-input-"+scope.editorUniqueId)

        scope.$watch('markdown', (value,oldValue) ->
          $wmdInput.val(value)
          isPreviewRefresh = true
          editor.refreshPreview()
          isPreviewRefresh = false
        )
  ])

