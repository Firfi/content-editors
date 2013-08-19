clone = (o) ->
  jQuery.extend({}, o);

# returns shallow copy of object without properties passed in varargs
Object.prototype.without = ->
  r = clone(@)
  for a in arguments
    delete r[a]
  r