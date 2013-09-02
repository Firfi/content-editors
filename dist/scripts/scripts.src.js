angular.module('topicoContentEditors', ['topicoAngularServiceApp']);

$.fn.getCursorPosition = function() {
  var input, sel, selLen;
  input = jQuery(this).get(0);
  if (document.selection) {
    input.focus();
    sel = document.selection.createRange();
    selLen = document.selection.createRange().text.length;
    sel.moveStart('character', -input.value.length);
    return sel.text.length - selLen;
  } else if (input.selectionStart || input.selectionStart === '0') {
    return input.selectionStart;
  } else {
    return 0;
  }
};

/*
//@ sourceMappingURL=init.js.map
*/
angular.module("topicoContentEditors").run(["$templateCache", function($templateCache) {

  $templateCache.put("editor/includeDialog.html",
    "<div class=\"modal fade\" id=\"{{ modalId }}\">\n" +
    "    <div class=\"modal-header\">\n" +
    "        <a class=\"close\" data-dismiss=\"modal\">&times;</a>\n" +
    "        <h3>Include resource</h3>\n" +
    "    </div>\n" +
    "    <div class=\"modal-body\">\n" +
    "        <p>Select resource type</p>\n" +
    "        <div>\n" +
    "            <button ng-repeat=\"type in types\"\n" +
    "                    button-toggle=\"active\"\n" +
    "                    class=\"btn\" ng-model=\"type.checked\">\n" +
    "                {{ type.name }}\n" +
    "            </button>\n" +
    "        </div>\n" +
    "        <div ng-show=\"servicesError\">{{ servicesError }}</div>\n" +
    "        <div>\n" +
    "            <label>\n" +
    "                <input ng-model=\"filters.title\" type=\"text\"/>\n" +
    "                <span>Filter title</span>\n" +
    "            </label>\n" +
    "        </div>\n" +
    "        <table class=\"table table-striped table-bordered table-condensed resources-popup-table\">\n" +
    "            <tr ng-repeat=\"resource in selectedResources()\" ng-click=\"includeResource(resource.id)\">\n" +
    "                <td>{{ schemaOrType(resource) }}</td>\n" +
    "                <td>{{ resource.title }}</td>\n" +
    "            </tr>\n" +
    "        </table>\n" +
    "    </div>\n" +
    "    <div class=\"modal-footer\">\n" +
    "        <a href=\"#\" class=\"btn\" data-dismiss=\"modal\">Close</a>\n" +
    "    </div>\n" +
    "</div>"
  );

  $templateCache.put("main.html",
    "<div class=\"hero-unit\">\n" +
    "    <topico-video-embed res=\"youtube\"></topico-video-embed>\n" +
    "    <textarea ng-model=\"descriptionMarkdown\"></textarea>\n" +
    "    <textarea ng-model=\"descriptionHtml\"></textarea>\n" +
    "    <topico-editor markdown=\"descriptionMarkdown\" html=\"descriptionHtml\"></topico-editor>\n" +
    "</div>\n"
  );

}]);

'use strict';
angular.module('topicoContentEditors').directive('buttonToggle', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function($scope, element, attr, ctrl) {
      var classToToggle;
      classToToggle = attr.buttonToggle;
      element.bind('click', function() {
        var checked;
        checked = ctrl.$viewValue;
        return $scope.$apply(function() {
          return ctrl.$setViewValue(!checked);
        });
      });
      return $scope.$watch(attr.ngModel, function(nv, ov) {
        if (nv) {
          return element.addClass(classToToggle);
        } else {
          return element.removeClass(classToToggle);
        }
      });
    }
  };
});

/*
//@ sourceMappingURL=buttonToggle.js.map
*/
'use strict';
angular.module('topicoContentEditors').directive('topicoEditor', [
  'topicoCEEditorSvc', 'topicoResourcesSvc', '$compile', '$timeout', '$templateCache', '$filter', 'topicoResourcesService', 'topicoCETestResourceSvc', function(topicoCEEditorSvc, topicoResourcesSvc, $compile, $timeout, $templateCache, $filter, topicoResourcesService, topicoCETestResourceSvc) {
    var nextId;
    nextId = 0;
    return {
      template: '<div class="pagedown-bootstrap-editor">\n<div class="wmd-panel">\n  <div id="wmd-button-bar-{{ editorUniqueId }}"></div>\n  <textarea class="wmd-input" id="{{ editorAreaId }}"></textarea>\n  <div id="wmd-preview-{{ editorUniqueId }}" class="wmd-panel wmd-preview"></div>\n</div>\n<div ng-include=" \'editor/includeDialog.html\' "></div>\n<a id="{{ includeLinkId }}" style="display: none;" href="#{{ modalId }}" data-toggle="modal"></a>\n</div>',
      replace: true,
      restrict: 'E',
      scope: {
        markdown: '=',
        html: '='
      },
      link: function(scope, element, attrs) {
        var api, serviceSuccess;
        scope.editorUniqueId = nextId++;
        scope.includeLinkId = "wmd-include-link-" + scope.editorUniqueId;
        scope.editorAreaId = "wmd-input-" + scope.editorUniqueId;
        scope.modalId = "wmd-include-" + scope.editorUniqueId;
        api = null;
        serviceSuccess = function(res) {
          var getResources;
          console.warn(JSON.stringify(res));
          api = res;
          scope.schemaOrType = function(o) {
            return o.resSchemaName || o.type;
          };
          scope.types = _.map(_.chain($.extend(res.tasks, res.topics)).groupBy(scope.schemaOrType).value(), function(v, k) {
            return {
              name: k,
              resources: v,
              checked: false
            };
          });
          getResources = function() {
            var r, _ref;
            r = $.map(scope.types, function(type) {
              return type.resources;
            });
            return (_ref = []).concat.apply(_ref, r);
          };
          scope.resources = getResources();
          scope.filters = {
            title: ''
          };
          scope.selectedTypes = function() {
            var filtered;
            filtered = _.select(scope.types, function(t) {
              return t.checked === true;
            });
            return filtered = filtered.length > 0 ? filtered : scope.types;
          };
          return scope.selectedResources = function() {
            var r, _ref;
            r = _.map(scope.selectedTypes(), function(type) {
              if (scope.filters.title === '') {
                return type.resources;
              } else {
                return _.select(type.resources, function(res) {
                  var _ref, _ref1;
                  return ((_ref = res.title) != null ? (_ref1 = _ref.toLowerCase()) != null ? _ref1.indexOf(scope.filters.title.toLowerCase()) : void 0 : void 0) !== -1;
                });
              }
            });
            return (_ref = []).concat.apply(_ref, r);
          };
        };
        topicoResourcesService.getTasks().then(serviceSuccess, function(err) {
          scope.servicesError = "error in request to " + err.url + ":\n" + err.msg + ". Make sure that you can access " + err.url + " through browser.\nFor now you'll see mockup data.";
          return serviceSuccess(topicoCETestResourceSvc);
        });
        return $timeout(function() {
          var $wmdInput, converter, editor, editorArea, help, includeLink, isPreviewRefresh, modal, topic, watches;
          includeLink = $('#' + scope.includeLinkId);
          editorArea = $('#' + scope.editorAreaId);
          modal = $('#' + scope.modalId);
          converter = new Markdown.Converter();
          help = function() {
            return alert("Topico markdown editor");
          };
          topic = {
            "type": "Res",
            "resSchemaName": "Topic",
            "tag": "groovy",
            "description": "Test topic 2",
            "aboutTopicIds": [],
            "aboutResIds": [],
            "title": "Test topic 2",
            "topics": [],
            "nonTopicAbouts": [],
            "statements": [
              {
                "predicate": "IS_ABOUT",
                "objectId": "518d3cd70cf27f0e99132475"
              }
            ]
          };
          scope.includeCallback = function() {
            scope.popupState = {
              carret: editorArea.getCursorPosition(),
              text: editorArea.val()
            };
            return includeLink.click();
          };
          scope.includeResource = function(id) {
            var cursor, end, newText, start, text;
            cursor = scope.popupState.carret;
            text = scope.popupState.text;
            start = text.substring(0, cursor);
            end = text.substring(cursor, text.length);
            newText = "" + start + "{{include " + id + "}}" + end;
            scope.popupState.text = newText;
            editorArea.val(newText);
            $timeout(function() {
              return editor.refreshPreview();
            });
            return modal.modal('hide');
          };
          editor = new Markdown.Editor(converter, "-" + scope.editorUniqueId, {
            handler: help,
            includeCallback: scope.includeCallback
          }, {
            buttonBar: element[0].firstElementChild.children[0],
            input: element[0].firstElementChild.children[1],
            preview: element[0].firstElementChild.children[2]
          });
          editor.run();
          isPreviewRefresh = false;
          watches = {};
          converter.hooks.chain("preConversion", function(markdown) {
            var newWatches, oldWatches, ow, resultMd, _i, _len;
            scope.markdown = markdown;
            newWatches = [];
            resultMd = markdown.replace(/{{include (.+?)}}/g, function(str, p1) {
              var r, wtc, _ref, _ref1;
              p1 = p1.trim();
              wtc = function() {
                if (scope.$parent[p1]) {
                  return scope.$parent.$watch(p1, function(o, n) {
                    return $timeout(function() {
                      return editor.refreshPreview();
                    });
                  });
                }
              };
              if (wtc) {
                if (!watches[p1]) {
                  watches[p1] = wtc();
                }
                newWatches.push(p1);
              }
              return (_ref = (_ref1 = scope.$parent[p1]) != null ? _ref1 : (r = $filter('getById')(scope.resources, p1), (r != null ? r.text : void 0) || (r != null ? r.description : void 0))) != null ? _ref : p1;
            });
            oldWatches = jQuery.extend({}, watches);
            delete oldWatches[newWatches];
            for (_i = 0, _len = oldWatches.length; _i < _len; _i++) {
              ow = oldWatches[_i];
              ow();
            }
            return resultMd;
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
angular.module('topicoContentEditors').filter('getById', function() {
  return function(input, id) {
    var o, _i, _len;
    for (_i = 0, _len = input.length; _i < _len; _i++) {
      o = input[_i];
      if (o.id === id) {
        return o;
      }
    }
  };
});

/*
//@ sourceMappingURL=getById.js.map
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
  return {
    list: function() {
      return [
        {
          id: 'first',
          type: 'note'
        }, {
          id: 'second',
          type: 'task'
        }
      ];
    }
  };
});

/*
//@ sourceMappingURL=topicoResourcesSvc.js.map
*/