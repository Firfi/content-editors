# Topico Content Editors

This project contains AngularJS directives for displaying and editing different types of content.

See the documentation for each type of content for more details.

## Video Viewer

The Video Viewer directive will embed videos from other sites for display.  Currently YouTube and Vimeo are supported, but others will be added in the future.  The data on the videos to display are represented as resources (see Sample Resources) section below.  You can think of resources as JSON objects.

The directive has a syntax like:

    <topico-video-embed res="<resource that contains information on video>">

The directive doesn't contain much information, because all of the information on the video to display, including whether it is YouTube or Vimeo, is contained in the resource.  So the directive simply has to be pointed to the resource that contains the information.

## Existing projects and other resources on the web

Following is information on embedding videos, in particular an already existing AngularJS directive that may be reused:

* Existing AngularJS directive to display YouTube, Vimeo videos: [ng-videosharing-embed](http://ngmodules.org/modules/ng-videosharing-embed)

## Sample Resources

Videos are represented as resources.  As stated above, you can think of a resource as a JSON object.  Each video has the following properties:

* title: Title for the video
* desc: Description of the video.  Optional.
* sourceId: ID for the video, specific to the site hosting it.  For YouTube, it is the YouTube ID, for Vimeo, it is the Vimeo ID.
* subType: Indicates the type of video: YouTube or Vimeo.  Other sub-types may be added in the future.

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

The text editor directive allows a user to edit text using an editor that supports markdown syntax.  Markdown is the syntax used by StackOverflow and other major sites.

The directive has two binding attributes:
* markdown: Markdown to be edited.  This is a bidirectional binding; the editor will be populated based on the markdown in the expression, and whenever the user changes the markdown in the editor, the variable pointed to by the binding will be updated.
* html: Variable to be updated with HTML generated from the Markdown

The directive has a syntax like:

    <topico-editor markdown="description.markdown" html="description.html">

Where "description.markdown" is part of the model; a variable holding the Markdown.  "description.html" is also part of the model; a variable where the generated HTML is to be placed.

### Existing projects and other resources on the web

The following projects may be the basis for this project.  I want to use PageDown.  The only question is which version of the library.

* Markdown Editor implemented in JavaScript: [PageDown project](https://code.google.com/p/pagedown/)

* Fork of PageDown tailored for Bootstrap: [samwillis pagedown-bootstrap](https://github.com/samwillis/pagedown-bootstrap)
    * Demo of this editor: [samwillis pagedown-bootstrap demo](http://samwillis.co.uk/pagedown-bootstrap/demo/browser/demo.html)

* Fork of PageDown above tailored for Bootstrap and FontAwesome: [tchapi pagedown-bootstrap](https://github.com/tchapi/pagedown-bootstrap)
    * This seems to be more active, and looks like the best option for library to use for the text editor directive.

* Project with example of AngularJS directives for PageDown editor: [sample angular editors](https://github.com/programmieraffe/angular-editors)
    * I don't think this can be used as-is, but can be an example of how to create the text editor directive



### How-to deploy:

* Install node.js: https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager
* Install yeoman: npm install -g yo
* Install Git
* Install js dependency packages: 'bower install'
* Install deploy dependencies: 'npm install'
* Build project: 'grunt'
* Run tests: 'grunt test'
It uses google-chrome for tests. If you run it by ssh then you could change browser to 'PhantomJS' in karma.conf.js or just omit this step.

## To deploy demo site, change directory to topico-content-editors-f5dd and

* bower install
On this step it may be necessary to add your public key to bitbucket and to have permissions to topico private repo.
* npm install
* grunt
* Run server from dist subdirectory
To run server it is convenient to use foreman from heroku-toolbelt: https://toolbelt.heroku.com/. Toolbelt is needed anyway to deploy in heroku. In that case you can run 'foreman start' from root directory (original topico-content-editors). In that case we need global coffee installation too.
