@App      or= {}
@App.Base or= {}

App         = @App

class App.Base.View

  constructor: ->
    @delegateEvents()

  delegateEvents: =>
    for event, callback of @events
      [_, name, selector] = event.match /^(\S+)\s*(.*)$/
      @$el.on name, selector, @[callback]
