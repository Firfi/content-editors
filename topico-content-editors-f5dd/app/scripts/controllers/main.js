'use strict';

angular.module('topicoContentEditorsF5ddApp')
  .controller('MainCtrl', function ($scope) {
    $scope.youtube = {
      "type": "Res",
      "desc": "Constructing solutions to systems of equations",
      "sourceId": "Z96vkuybvjE",
      "subType": "YouTube",
      "url": "http://www.youtube.com/watch?v=Z96vkuybvjE",
      "resSchemaName": "VIDEO",
      "id": "51fb288003644239e34d9bc1",
      "aboutTopicIds": [],
      "aboutResIds": [],
      "title": "Constructing solutions to systems of equations",
      "nonTopicAbouts": [],
      "statements": [
        {
          "predicate": "IS_ABOUT",
          "objectId": "51fb288003644239e34d9bb7"
        }
      ]
    };
    $scope.vimeo = {
      "type": "Res",
      "desc": "<p><a href=\"http://vimeo.com/71336599\">The Thing About Dogs</a> from <a href=\"http://vimeo.com/danielkoren\">Daniel Koren</a> on <a href=\"https://vimeo.com\">Vimeo</a>.",
       "sourceId": "71336599",
      "subType": "Vimeo",
      "url": "http://vimeo.com/71336599",
      "resSchemaName": "VIDEO",
      "id": "51fb288003644239e34d9bc2",
      "aboutTopicIds": [],
      "aboutResIds": [],
      "title": "The Thing About Dogs",
      "nonTopicAbouts": [],
      "statements": [{
        "predicate": "IS_ABOUT",
        "objectId": "51fb288003644239e34d9bb7"
      }]
    };

    $scope.first = "*my first included markdown*"
    $scope.second = "# my second included markdown"

  });