angular.module('topicoContentEditorsApp', []);

/*
//@ sourceMappingURL=init.js.map
*/
'use strict';
var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

angular.module('topicoContentEditorsApp').directive('topicoVideoEmbed', function() {
  return {
    template: '<div></div>',
    restrict: 'E',
    link: function(scope, element, attrs) {
      var err, m, res, subType, t, types, validate;
      types = ['youtube', 'vimeo'];
      res = attrs.res;
      if (typeof res === 'string') {
        res = scope.$eval(res);
      }
      console.warn("res is not defined for element: " + element[0].nodeName);
      if (!res) {
        return;
      }
      subType = res.subType;
      if (subType == null) {
        subType = ((function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = types.length; _i < _len; _i++) {
            t = types[_i];
            if (m = res.url.match(new RegExp(t, 'i'))) {
              _results.push(m[0]);
            }
          }
          return _results;
        })())[0];
      }
      subType = subType.toLowerCase();
      validate = function() {
        var _ref;
        if (_ref = !subType, __indexOf.call(types, _ref) >= 0) {
          return "subtype is not valid. valid subtypes: " + types;
        } else {
          return true;
        }
      };
      if (err = validate() !== true) {
        element.text('');
        return console.warn(err);
      } else {
        return element.text('valid');
      }
    }
  };
});

/*
//@ sourceMappingURL=topicoVideoEmbed.js.map
*/