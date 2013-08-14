angular.module('topicoContentEditorsApp', []);

/*
//@ sourceMappingURL=init.js.map
*/
'use strict';
angular.module('topicoContentEditorsApp').directive('topicoVideoEmbed', [
  'topicoCESvc', function(topicoCESvc) {
    return {
      template: '<iframe width="{{ config.width }}" height="{{ config.height }}" src="{{ config.src }}" frameborder="0" allowfullscreen></iframe>',
      restrict: 'E',
      link: function(scope, element, attrs) {
        var err, res, types;
        types = topicoCESvc.videoTypes;
        res = topicoCESvc.res(scope, element, attrs);
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
var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

angular.module('topicoContentEditorsApp').service('topicoCESvc', function() {
  var sub, validate, videoTypes;
  validate = function(subType, types) {
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
  };
  sub = function(res) {
    var e, m, subType, t;
    subType = res.subType;
    if (subType == null) {
      subType = ((function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = videoTypes.length; _i < _len; _i++) {
          t = videoTypes[_i];
          if (m = res.url.match(new RegExp(t, 'i'))) {
            _results.push(m[0]);
          }
        }
        return _results;
      })())[0];
    }
    try {
      return subType.toLowerCase();
    } catch (_error) {
      e = _error;
      return 'youtube';
    }
  };
  videoTypes = ['youtube', 'vimeo'];
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
      list: videoTypes,
      validate: function(subType) {
        return validate(subType, videoTypes);
      },
      subType: sub,
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
});

/*
//@ sourceMappingURL=topicoCESvc.js.map
*/