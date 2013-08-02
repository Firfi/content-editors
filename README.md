# Topico Content Editors

This project contains AngularJS directives for displaying and editing different types of content.

See the documentation for each type of content for more details.

## Video Viewer

The Video Viewer directive will embed videos from other sites for display.  Currently YouTube and Vimeo are supported, but others will be added in the future.  The data on the videos to display are represented as resources (see Sample Resources) section below.

The directive has a syntax like:

    <topico-video-embed res="<resource that contains information on video>">

The directive doesn't contain much information, because all of the information on the video to display, including whether it is YouTube or Vimeo, is contained in the resource.  So the directive simply has to be pointed to the resource that contains the information.

## Existing projects and other resources on the web

Following is information on embedding videos, in particular an already existing AngularJS directive that may be reused:

* Existing AngularJS directive to display YouTube, Vimeo videos: http://ngmodules.org/modules/ng-videosharing-embed

## Sample Resources

Videos are represented as resources, same as links, tasks, etc.  Each video has the following properties:

* title: Title for the video
* desc: Description of the video.  Optional.
* sourceId: ID for the video, specific to the site hosting it.  For YouTube, it is the YouTube ID, for Vimeo, it is the Vimeo ID.
* subType: Indicates the type of video: YouTube or Vimeo


Following are examples of two resources, one a YouTube video, one a Vimeo video.

        {
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
        },
        {
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
          "statements": [
            {
              "predicate": "IS_ABOUT",
              "objectId": "51fb288003644239e34d9bb7"
            }
          ]
        }



### YouTube videos

For the YouTube video above, the directive will generate the appropriate code to embed the video, such as:

    <iframe width="853" height="480" src="//www.youtube.com/embed/Z96vkuybvjE" frameborder="0" allowfullscreen></iframe>

The above code was taken from YouTube itself, by selecting to share, and using the embed option.

### Vimeo Videos

For the Vimeo video above, the directive will generate the appropriate code to embed the video, such as:

    <iframe src="http://player.vimeo.com/video/71336599?title=0&amp;byline=0&amp;portrait=0&amp;badge=0" width="500" height="281" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe> <p><a href="http://vimeo.com/71336599">The Thing About Dogs</a> from <a href="http://vimeo.com/danielkoren">Daniel Koren</a> on <a href="https://vimeo.com">Vimeo</a>.</p>

The above code was taken from Vimeo itself, by selecting to share, and using the embed option.

## Text Editor

* https://code.google.com/p/pagedown/

* https://github.com/programmieraffe/angular-editors


