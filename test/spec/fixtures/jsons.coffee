'use strict';


angular.module('mockedServices', [])
  .value('TasksJSON', JSON.parse('
  {
    "spaceId": "521ad2820cf238a6d6bb580c",
    "topics": [],
    "mainTopics": [],
    "tasks": [
      {
        "type": "Task",
        "text": "Task text 1",
        "priority": 5,
        "taskStatus": "ACTIVE",
        "id": "521d0bc90cf238a6d6bb5810",
        "aboutTopicIds": [],
        "aboutResIds": [],
        "title": "Task title 1",
        "nonTopicAbouts": [],
        "statements": []
      },
      {
        "type": "Task",
        "text": "Task text 2",
        "priority": 5,
        "taskStatus": "ACTIVE",
        "id": "521e60880cf238a6d6bb5811",
        "aboutTopicIds": [],
        "aboutResIds": [],
        "title": "Task title 2",
        "nonTopicAbouts": [],
        "statements": []
      },
      {
        "type": "Link",
        "text": "Link text 1",
        "priority": 5,
        "taskStatus": "ACTIVE",
        "id": "521d0bc90cf238a6d6bb5812",
        "aboutTopicIds": [],
        "aboutResIds": [],
        "title": "Link title 1",
        "nonTopicAbouts": [],
        "statements": []
      }
    ]
  }
  ')
);