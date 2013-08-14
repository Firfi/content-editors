'use strict';

angular.module('topicoContentEditorsApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
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

  });
