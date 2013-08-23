angular.module('topicoContentEditors')
  .service 'topicoResourcesSvc', () ->
    resourceRegistry =
      first:
        id: 'first'
        markdown: "*my included markdown first*"
      second:
        id: 'second'
        markdown: "# my included markdown second"
    getMarkdown: (resource) ->
      id = resource.id || resource
      resourceRegistry[id]?.markdown || id
