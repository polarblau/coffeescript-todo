expect = require('chai').expect
Todo   = null

describe 'Todo', ->

  beforeEach ->
    path = '../lib/models/todo'
    delete require.cache[require.resolve(path)]
    Todo = require(path).App.Models.Todo

  describe 'constructor', ->
    it 'should set valid attributes', ->
      todo = new Todo(name: 'Foobar')
      expect(todo.name).to.equal 'Foobar'

    it 'should not set invalid attributes', ->
      todo = new Todo(foo: 'bar')
      expect(todo.foo).to.be.undefined

  describe '.all', ->
    it 'should return an empty array by default', ->
      expect(Todo.all()).to.be.empty

    it 'should return all todos', ->
      todo = new Todo(name: 'Foo')
      expect(Todo.all()).to.include todo

  describe '.find', ->
    it 'should return undefined item', ->
      expect(Todo.find(123)).to.be.undefined

    it 'should return an item found by id', ->
      todo = new Todo(name: 'Foo')
      expect(Todo.find(todo.id)).to.equal todo

  describe '.sort', ->
    beforeEach ->
      @incomplete = new Todo(complete: false)
      @complete   = new Todo(complete: true)

    it 'should sort items by wether they are complete by default', ->
      expect(Todo.all()[0]).to.equal @complete
      expect(Todo.all()[1]).to.equal @incomplete
      incomplete2 = new Todo(complete: false)
      expect(Todo.all()[0]).to.equal @complete
      expect(Todo.all()[1]).to.equal incomplete2
      expect(Todo.all()[2]).to.equal @incomplete

  describe '.select', ->
    it 'returns all complete todos', ->
      incomplete = new Todo(complete: false)
      complete   = new Todo(complete: true)
      expect(Todo.select((t) -> t.complete)).not.to.include incomplete
      expect(Todo.select((t) -> t.complete)).to.include complete

  describe '#destroy', ->
    it 'should remove a todo', ->
      todo = new Todo(name: 'Foo')
      todo.destroy()
      expect(Todo.all()).not.to.include todo


