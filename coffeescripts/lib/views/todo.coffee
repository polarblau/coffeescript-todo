@App       or= {}
@App.Views or= {}

App          = @App
Model        = App.Models.Todo

class App.Views.Todo extends App.Base.View

  events:
    'dblclick strong'      : 'edit'
    'click a.remove'       : 'remove'
    'keypress input.edit'  : 'updateIfEnter'
    'blur input.edit'      : 'stopEditing'
    'change input.complete': 'toggle'

  template: Handlebars.compile($('#todo').html())

  constructor: (@todo) ->
    @$el = $('<li/>')
    super()

  render: (data)->
    @$el.html(@template(todo: @todo))
    @$el.addClass 'complete' if @todo.complete
    @$input = @$el.find('input.edit')

  edit: =>
    @$input.show().focus()

  stopEditing: =>
    @$input.hide().val(@todo.name)

  remove: =>
    Model.find(@todo.id).destroy()
    @$el.remove()

  updateIfEnter: (e)=>
    if e.which == 13
      @todo.name = @$input.val()
      @render()

  toggle: (e)=>
    complete = $(e.target).is(':checked')
    @todo.complete = complete
    @$el.trigger 'sort'
