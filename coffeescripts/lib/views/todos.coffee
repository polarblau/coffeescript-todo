@App       or= {}
@App.Views or= {}

App          = @App
Model        = App.Models.Todo

class App.Views.Todos extends App.Base.View

  events:
    'submit form'     : 'create'
    'click p.clear a' : 'removeCompleted'
    'sort ul'         : 'render'

  template: Handlebars.compile($('#todo-list').html())

  constructor: (selector) ->
    @$el = $(selector)
    super()

  create: (e)=>
    e.preventDefault()
    todo = new Model(name: @$input.val())
    @add(todo)
    @$input.val('')

  add: (todo)->
    view = new App.Views.Todo(todo)
    view.render()
    @$list.prepend view.$el

  render: =>
    # only pass needed data
    # sort on update
    Model.sort()
    @$el.html @template()
    @$input = @$el.find('input.new-todo')
    @$list  = @$el.find('#todos')
    @add(todo) for todo in Model.all()

  removeCompleted: =>
    todo.destroy() for todo in Model.select (t)-> t.complete
    @render()
