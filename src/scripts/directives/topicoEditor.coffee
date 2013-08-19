'use strict';

angular.module('topicoContentEditors')
  .directive('topicoEditor', ['topicoCEEditorSvc', '$compile', '$timeout', '$window', (topicoCEEditorSvc, $compile, $timeout, $window) ->

    nextId = 0;

    template: '''<div class="pagedown-bootstrap-editor">
              <div class="wmd-panel">
                <div id="wmd-button-bar-{{ editorUniqueId }}"></div>
                <textarea class="wmd-input" id="wmd-input-{{ editorUniqueId }}"></textarea>
                <div id="wmd-preview-{{ editorUniqueId }}" class="wmd-panel wmd-preview"></div>
              </div>
              </div>'''
    replace: true
    restrict: 'E'
    scope:
      markdown: '='
      html: '='

    link: (scope, element, attrs) ->
      scope.editorUniqueId = nextId++
      # this is method to evaluate template so it is accessible through window.document.getElementById().
      # window.document.getElementById() is used inside Markdown library and it doesn't see template elements otherwise.
      # Other way to do it is wrap all function in $timeout but it is supposed to be error-prone.
      # Approach in https://github.com/programmieraffe/angular-editors doesn't work with tests but only in browser
      doc = window.document
      $timeout ->
        # This code will run after
        # template has been loaded, cloned
        # and transformed by directives.
        converter = new Markdown.Converter()

        help = ->
          alert("Topico markdown editor")

        # elements is for correct tests
        editor = new Markdown.Editor(converter, "-"+scope.editorUniqueId, handler: help, {
          buttonBar: element[0].firstElementChild.children[0]
          input: element[0].firstElementChild.children[1]
          preview: element[0].firstElementChild.children[2]
        })

        editor.run()

        # keep hooks after editor.run()

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

