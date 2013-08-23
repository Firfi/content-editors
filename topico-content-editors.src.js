angular.module('topicoContentEditors', []);

/*
//@ sourceMappingURL=init.js.map
*/
'use strict';
angular.module('topicoContentEditors').directive('topicoEditor', [
  'topicoCEEditorSvc', 'topicoResourcesSvc', '$compile', '$timeout', '$window', function(topicoCEEditorSvc, topicoResourcesSvc, $compile, $timeout, $window) {
    var nextId;
    nextId = 0;
    return {
      template: '<div class="pagedown-bootstrap-editor">\n<div class="wmd-panel">\n  <div id="wmd-button-bar-{{ editorUniqueId }}"></div>\n  <textarea class="wmd-input" id="wmd-input-{{ editorUniqueId }}"></textarea>\n  <div id="wmd-preview-{{ editorUniqueId }}" class="wmd-panel wmd-preview"></div>\n</div>\n</div>',
      replace: true,
      restrict: 'E',
      scope: {
        markdown: '=',
        html: '='
      },
      link: function(scope, element, attrs) {
        var doc;
        scope.editorUniqueId = nextId++;
        doc = window.document;
        return $timeout(function() {
          var $wmdInput, converter, editor, help, isPreviewRefresh;
          converter = new Markdown.Converter();
          help = function() {
            return alert("Topico markdown editor");
          };
          editor = new Markdown.Editor(converter, "-" + scope.editorUniqueId, {
            handler: help
          }, {
            buttonBar: element[0].firstElementChild.children[0],
            input: element[0].firstElementChild.children[1],
            preview: element[0].firstElementChild.children[2]
          });
          editor.run();
          isPreviewRefresh = false;
          converter.hooks.chain("preConversion", function(markdown) {
            scope.markdown = markdown;
            return markdown.replace(/{{(.+?)}}/g, function(str, p1) {
              return topicoResourcesSvc.getMarkdown(p1.trim());
            });
          });
          converter.hooks.chain("postConversion", function(html) {
            return scope.html = html;
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
      template: '<div class="topico-embed-video">\n<iframe\n\nwidth="{{ config.width }}"\nheight="{{ config.height }}"\nsrc="{{ config.src }}"\nframeborder="{{ config.frameborder }}"\nwebkitAllowFullScreen mozallowfullscreen allowFullScreen>\n\n</iframe>\n<div ng-bind-html-unsafe="config.desc"></div>\n</div>',
      restrict: 'E',
      scope: {
        res: '='
      },
      replace: true,
      link: function(scope, element, attrs) {
        var err, res, types;
        types = topicoCEVideoSvc.videoTypes;
        res = scope.res;
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
          var getUrl, height, subtype, url, width, _ref, _ref1, _ref2, _ref3;
          subtype = this.subType(res);
          width = {
            youtube: 838,
            vimeo: 500
          }[subtype];
          height = {
            youtube: 480,
            vimeo: 281
          }[subtype];
          getUrl = function() {
            var embed, query, subdomain;
            embed = {
              youtube: 'embed',
              vimeo: 'video'
            }[subtype];
            subdomain = {
              youtube: '',
              vimeo: 'player.'
            }[subtype];
            query = {
              youtube: '',
              vimeo: "?title=0&amp;byline=0&amp;portrait=0&amp;badge=0"
            }[subtype];
            return "" + location.protocol + "//" + subdomain + subtype + ".com/" + embed + "/" + res.sourceId + query;
          };
          url = (_ref = getUrl()) != null ? _ref : res.url;
          url = url.replace(/watch\?v=/, 'embed/');
          return {
            src: url,
            width: (_ref1 = res.width) != null ? _ref1 : width,
            height: (_ref2 = res.height) != null ? _ref2 : height,
            frameborder: 0,
            desc: (_ref3 = res.desc) != null ? _ref3 : ''
          };
        }
      }
    };
  }
]);

/*
//@ sourceMappingURL=topicoCEVideoSvc.js.map
*/
angular.module('topicoContentEditors').service('topicoResourcesSvc', function() {
  var resourceRegistry;
  resourceRegistry = {
    first: {
      id: 'first',
      markdown: "*my included markdown first*"
    },
    second: {
      id: 'second',
      markdown: "# my included markdown second"
    }
  };
  return {
    getMarkdown: function(resource) {
      var id, _ref;
      id = resource.id || resource;
      return ((_ref = resourceRegistry[id]) != null ? _ref.markdown : void 0) || id;
    }
  };
});

/*
//@ sourceMappingURL=topicoResourcesSvc.js.map
*/