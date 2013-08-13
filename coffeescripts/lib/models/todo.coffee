@App           or= {}
@App.Models    or= {}

class Todo

  @attributes: ['id', 'name', 'complete']
  @storage   : []
  @idCounter : 0
  @generateID: -> ++Todo.idCounter

  constructor: (attrs)->
    @id = Todo.generateID()
    @[k] = v for k, v of attrs when k in Todo.attributes
    @complete = false unless @complete?
    Todo.storage.unshift @
    Todo.sort()
    @

  @all: ->
    Todo.storage

  @find: (id)->
    (todo for todo in Todo.storage when todo.id is id)[0]

  @sort: ->
    Todo.storage.sort (a, b)->
      if a.complete is b.complete then 0
      else if a.complete < b.complete then 1
      else -1

  @select: (iterator)->
    todo for todo in Todo.storage when !!iterator(todo)

  destroy: ->
    index = (index for todo, index in Todo.storage when todo.id is @id)[0]
    Todo.storage.splice(index, 1)

(exports ? @).App.Models.Todo = Todo
