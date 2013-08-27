'use strict';

angular.module('topicoContentEditors')
  .directive('topicoEditor', ['topicoCEEditorSvc', 'topicoResourcesSvc', '$compile', '$timeout', '$templateCache', (topicoCEEditorSvc, topicoResourcesSvc, $compile, $timeout, $templateCache) ->

    nextId = 0;

    template: '''<div class="pagedown-bootstrap-editor">
              <div class="wmd-panel">
                <div id="wmd-button-bar-{{ editorUniqueId }}"></div>
                <textarea class="wmd-input" id="wmd-input-{{ editorUniqueId }}"></textarea>
                <div id="wmd-preview-{{ editorUniqueId }}" class="wmd-panel wmd-preview"></div>
              </div>
              <div ng-include=" 'editor/includeDialog.html' "></div>
              <a id="{{ includeLinkId }}" style="display: none;" href="#wmd-include-{{ editorUniqueId }}" data-toggle="modal"></a>
              </div>'''
    replace: true
    restrict: 'E'
    scope:
      markdown: '='
      html: '='

    link: (scope, element, attrs) ->
      scope.editorUniqueId = nextId++
      scope.includeLinkId = "wmd-include-link-#{scope.editorUniqueId}"
      # this is method to evaluate template so it is accessible through window.document.getElementById().
      # window.document.getElementById() is used inside Markdown library and it doesn't see template elements otherwise.
      # Other way to do it is wrap all function in $timeout but it is supposed to be error-prone.
      # Approach in https://github.com/programmieraffe/angular-editors doesn't work with tests but only in browser
      $timeout ->
        # This code will run after
        # template has been loaded, cloned
        # and transformed by directives.
        converter = new Markdown.Converter()

        help = ->
          alert("Topico markdown editor")

        includeCallback = (a, b) ->
          $('#'+scope.includeLinkId).click()

        # elements is for correct tests
        editor = new Markdown.Editor(converter, "-"+scope.editorUniqueId, {
          handler: help,
          includeCallback: includeCallback
        }, {
          buttonBar: element[0].firstElementChild.children[0]
          input: element[0].firstElementChild.children[1]
          preview: element[0].firstElementChild.children[2]
        })

        editor.run()

        # keep hooks after editor.run()

        isPreviewRefresh = false

        watches = {} # night gathers, and now my watch begins

        converter.hooks.chain("preConversion", (markdown) ->
          scope.markdown = markdown
          newWatches = []
          resultMd = markdown.replace /{{include (.+?)}}/g, (str, p1) ->
            p1 = p1.trim()
            wtc = ->
              # we don't know about these variables on isolated scope create phase so use parent
              scope.$parent.$watch p1, (o,n) -> # save unwatch function
                $timeout ->
                  editor.refreshPreview()
            watches[p1] = wtc() unless watches[p1]
            # log new/and old and not-updated watch
            newWatches.push p1

            scope.$parent[p1] ? p1

          # remove watches for what {{include ...}} was removed
          oldWatches = jQuery.extend({}, watches) # clone
          delete oldWatches[newWatches]
          ow() for ow in oldWatches # call unwatch function

          resultMd
        )

        converter.hooks.chain("postConversion", (html) ->
          scope.html = html
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

        # returns object attributes intersection and
        intersect = (x,y) ->


  ])

