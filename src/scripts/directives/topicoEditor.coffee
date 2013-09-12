'use strict';

angular.module('topicoContentEditors')
  .directive('topicoEditor', [
    'topicoCEEditorSvc',
    'topicoResourcesSvc',
    '$compile',
    '$timeout',
    '$templateCache',
    '$filter'
    'topicoResourcesService',
    'topicoCETestResourceSvc',
    '$q'
    (topicoCEEditorSvc, topicoResourcesSvc, $compile, $timeout, $templateCache, $filter, topicoResourcesService, topicoCETestResourceSvc, $q) ->

      nextId = 0;

      template: '''<div class="pagedown-bootstrap-editor">
                <div class="wmd-panel">
                  <div id="wmd-button-bar-{{ editorUniqueId }}"></div>
                  <textarea class="wmd-input" id="{{ editorAreaId }}"></textarea>
                  <div id="wmd-preview-{{ editorUniqueId }}" class="wmd-panel wmd-preview"></div>
                </div>
                <div ng-include=" 'editor/includeDialog.html' "></div>
                <a id="{{ includeLinkId }}" style="display: none;" href="#{{ modalId }}"></a>
                </div>'''
      replace: true
      restrict: 'E'
      scope:
        markdown: '='
        html: '='

      link: (scope, element, attrs) ->

        scope.editorUniqueId = nextId++
        scope.includeLinkId = "wmd-include-link-#{scope.editorUniqueId}"
        scope.editorAreaId = "wmd-input-#{scope.editorUniqueId}"
        scope.modalId = "wmd-include-#{scope.editorUniqueId}"

        api = null
        editor = null

        serviceDefer = $q.defer()

        scope.resources = []

        serviceSuccess = (res) ->
          api = res
          scope.schemaOrType = (o) ->
            o.resSchemaName || o.type
          scope.types =
            _.map (_.chain($.extend(res.tasks, res.topics)).groupBy(scope.schemaOrType).value()), (v, k) ->
              name: k
              resources: v
              checked: false
          getResources = ->
            r = $.map scope.types, (type) ->
              type.resources
            [].concat r...
          scope.resources = getResources()
          scope.filters =
            title: ''
          scope.selectedTypes = ->
            filtered = _.select scope.types, (t) ->
              t.checked is true
            filtered = if filtered.length > 0 then filtered else scope.types
          scope.selectedResources = ->
            r = _.map scope.selectedTypes(), (type) ->
              if scope.filters.title is '' then type.resources else _.select type.resources, (res) ->
                res.title?.toLowerCase()?.indexOf(scope.filters.title.toLowerCase()) isnt -1
            [].concat r...

          $timeout ->  # this make it preload richHtml on initialisation when editor is being included with ng-switch
            editor.refreshPreview()

          serviceDefer.resolve()

        topicoResourcesService.getTasks().then serviceSuccess, (err) ->
          scope.servicesError = """error in request to #{err.url}:
                                  #{err.msg}. Make sure that you can access #{err.url} through browser.
                                  For now you'll see mockup data.
                                """
          serviceSuccess(topicoCETestResourceSvc)



        # this is method to evaluate template so it is accessible through window.document.getElementById().
        # window.document.getElementById() is used inside Markdown library and it doesn't see template elements otherwise.
        # Approach in https://github.com/programmieraffe/angular-editors doesn't work with tests but only in browser
        $timeout ->

          editorArea = $('#'+scope.editorAreaId)
          modal = $('#'+scope.modalId)

          converter = new Markdown.Converter()

          help = ->
            alert("Topico markdown editor")

          topic = {
            "type": "Res",
            "resSchemaName": "Topic"
            "tag": "groovy",
            "description": "Test topic 2",
            "aboutTopicIds": [],
            "aboutResIds": [],
            "title": "Test topic 2",
            "topics": [],
            "nonTopicAbouts": [],
            "statements": [
              "predicate": "IS_ABOUT",
              "objectId": "518d3cd70cf27f0e99132475"
            ]
          }

          scope.includeCallback = ->
           # api.saveTopic([],topic)
            scope.popupState =
              # this sort of state refreshes every call to popup
              carret: editorArea.getCursorPosition()
              text: editorArea.val()

            modal.modal()

          scope.includeResource = (id) ->
            cursor = scope.popupState.carret
            text = scope.popupState.text
            start = text.substring(0, cursor)
            end = text.substring(cursor, text.length)
            newText = "#{start}{{include #{id}}}#{end}"
            scope.popupState.text = newText
            editorArea.val(newText)
            $timeout ->
              editor.refreshPreview()
            modal.modal('hide');

          # elements[] is for correct unit tests
          editor = new Markdown.Editor(converter, "-"+scope.editorUniqueId, {
            handler: help
            includeCallback: scope.includeCallback
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
                if scope.$parent[p1]
                  scope.$parent.$watch p1, (o,n) -> # save unwatch function
                    $timeout ->
                      editor.refreshPreview()

              if wtc
                watches[p1] = wtc() unless watches[p1]
                # log new/and old and not-updated watch
                newWatches.push p1


              scope.$parent[p1] ? (r = $filter('getById')(scope.resources, p1); (r?.text or r?.description)) ? p1

            # remove watches for what {{include ...}} was removed
            oldWatches = jQuery.extend({}, watches) # clone
            delete oldWatches[newWatches]
            ow() for ow in oldWatches # call unwatch function

            resultMd
          )

          converter.hooks.chain "postConversion", (html) ->
            scope.html = html

          editor.hooks.chain "onPreviewRefresh", ->
            unless isPreviewRefresh
              scope.$apply()

          $wmdInput = $("#wmd-input-"+scope.editorUniqueId)

          scope.$watch 'markdown', (value,oldValue) ->
            $wmdInput.val(value)
            isPreviewRefresh = true
            editor.refreshPreview()
            isPreviewRefresh = false

          $timeout ->
            editor.refreshPreview()
    ])

