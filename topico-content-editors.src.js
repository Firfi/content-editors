angular.module('topicoContentEditors', []);

/*
//@ sourceMappingURL=init.js.map
*/
'use strict';
angular.module('topicoContentEditors').directive('topicoEditor', [
  'topicoCEEditorSvc', '$compile', '$timeout', function(topicoCEEditorSvc, $compile, $timeout) {
    var nextId;
    nextId = 0;
    return {
      template: '<div class="pagedown-bootstrap-editor">\n <div>\n   <div class="wmd-panel-{{ editorUniqueId }}">\n     <div id="wmd-button-bar-{{ editorUniqueId }}">\n       <textarea class="wmd-input" id="wmd-input-{{ editorUniqueId }}"></textarea>\n     </div>\n     <div id="wmd-preview-{{ editorUniqueId }}" class="wmd-panel wmd-preview"></div>\n   </div>\n </div>\n</div>',
      replace: true,
      restrict: 'E',
      scope: {
        markdown: '=',
        html: '='
      },
      link: function(scope, element, attrs) {
        scope.editorUniqueId = nextId++;
        return $timeout(function() {
          var $wmdInput, converter, editor, help, isPreviewRefresh;
          converter = new Markdown.Converter();
          help = function() {
            return alert("Topico markdown editor");
          };
          editor = new Markdown.Editor(converter, "-" + scope.editorUniqueId, {
            handler: help
          });
          editor.run();
          isPreviewRefresh = false;
          converter.hooks.chain("preConversion", function(markdown) {
            scope.markdown = markdown;
            return markdown;
          });
          converter.hooks.chain("postConversion", function(html) {
            scope.html = html;
            return html;
          });
          editor.hooks.chain("onPreviewRefresh", function() {
            if (!isPreviewRefresh) {
              return scope.$apply();
            }
          });
          $wmdInput = $("#wmd-input-" + scope.editorUniqueId);
          return scope.$watch('markdown', function(value, oldValue) {
            $wmdInput.val(value);
            isPreviewRefresh = true;
            editor.refreshPreview();
            return isPreviewRefresh = false;
          });
        });
      }
    };
  }
]);

/*
//@ sourceMappingURL=topicoEditor.js.map
*/
'use strict';
angular.module('topicoContentEditors').directive('topicoVideoEmbed', [
  'topicoCEVideoSvc', function(topicoCEVideoSvc) {
    return {
      template: '<iframe width="{{ config.width }}" height="{{ config.height }}" src="{{ config.src }}" frameborder="0" allowfullscreen></iframe>',
      restrict: 'E',
      replace: true,
      link: function(scope, element, attrs) {
        var err, res, types;
        types = topicoCEVideoSvc.videoTypes;
        res = topicoCEVideoSvc.res(scope, element, attrs);
        if ((err = types.validate(res.subType)) !== true) {
          element.text('');
          return console.warn(err);
        } else {
          return scope.config = types.config(res);
        }
      }
    };
  }
]);

/*
//@ sourceMappingURL=topicoVideoEmbed.js.map
*/
'use strict';
angular.module('topicoContentEditors').service('topicoCEEditorSvc', function() {});

/*
//@ sourceMappingURL=topicoCEEditorSvc.js.map
*/
'use strict';
var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

angular.module('topicoContentEditors').service('topicoCESvc', function() {
  return {
    validate: function(subType, types) {
      var e;
      subType = (function() {
        try {
          return subType.toLowerCase();
        } catch (_error) {
          e = _error;
          return null;
        }
      })();
      if (__indexOf.call(types, subType) < 0) {
        return "subtype " + subType + " is not valid. valid subtypes: " + types;
      } else {
        return true;
      }
    }
  };
});

/*
//@ sourceMappingURL=topicoCESvc.js.map
*/
'use strict';
angular.module('topicoContentEditors').service('topicoCEVideoSvc', [
  'topicoCESvc', function(topicoCESvc) {
    return {
      res: function(scope, element, attrs) {
        var res;
        res = attrs.res;
        if (typeof res === 'string') {
          res = scope.$eval(res);
        }
        if (!res) {
          console.warn("res is not defined for element: " + element[0].nodeName);
        }
        return res;
      },
      videoTypes: {
        list: ['youtube', 'vimeo'],
        validate: function(subType) {
          return topicoCESvc.validate(subType, this.list);
        },
        subType: function(res) {
          var e, m, subType, t;
          subType = res.subType;
          try {
            return (subType = ((function() {
              var _i, _len, _ref, _results;
              _ref = this.list;
              _results = [];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                t = _ref[_i];
                if (m = res.url.match(new RegExp(t, 'i'))) {
                  _results.push(m[0]);
                }
              }
              return _results;
            }).call(this))[0]).toLowerCase();
          } catch (_error) {
            e = _error;
            return 'youtube';
          }
        },
        config: function(res) {
          var getUrl, url, _ref;
          getUrl = function() {
            var embed;
            embed = {
              youtube: 'embed',
              vimeo: 'video'
            }[sub(res)];
            return "" + location.protocol + "//" + (sub(res)) + ".com/" + embed + "/" + res.sourceId;
          };
          url = (_ref = res.url) != null ? _ref : getUrl();
          url = url.replace(/watch\?v=/, 'embed/');
          return {
            src: url,
            width: res.width,
            height: res.height
          };
        }
      }
    };
  }
]);

/*
//@ sourceMappingURL=topicoCEVideoSvc.js.map
*/