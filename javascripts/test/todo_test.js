(function() {
  var Todo, expect;

  expect = require('chai').expect;

  Todo = null;

  describe('Todo', function() {
    beforeEach(function() {
      var path;

      path = '../lib/models/todo';
      delete require.cache[require.resolve(path)];
      return Todo = require(path).App.Models.Todo;
    });
    describe('constructor', function() {
      it('should set valid attributes', function() {
        var todo;

        todo = new Todo({
          name: 'Foobar'
        });
        return expect(todo.name).to.equal('Foobar');
      });
      return it('should not set invalid attributes', function() {
        var todo;

        todo = new Todo({
          foo: 'bar'
        });
        return expect(todo.foo).to.be.undefined;
      });
    });
    describe('.all', function() {
      it('should return an empty array by default', function() {
        return expect(Todo.all()).to.be.empty;
      });
      return it('should return all todos', function() {
        var todo;

        todo = new Todo({
          name: 'Foo'
        });
        return expect(Todo.all()).to.include(todo);
      });
    });
    describe('.find', function() {
      it('should return undefined item', function() {
        return expect(Todo.find(123)).to.be.undefined;
      });
      return it('should return an item found by id', function() {
        var todo;

        todo = new Todo({
          name: 'Foo'
        });
        return expect(Todo.find(todo.id)).to.equal(todo);
      });
    });
    describe('.sort', function() {
      beforeEach(function() {
        this.incomplete = new Todo({
          complete: false
        });
        return this.complete = new Todo({
          complete: true
        });
      });
      return it('should sort items by wether they are complete by default', function() {
        var incomplete2;

        expect(Todo.all()[0]).to.equal(this.complete);
        expect(Todo.all()[1]).to.equal(this.incomplete);
        incomplete2 = new Todo({
          complete: false
        });
        expect(Todo.all()[0]).to.equal(this.complete);
        expect(Todo.all()[1]).to.equal(incomplete2);
        return expect(Todo.all()[2]).to.equal(this.incomplete);
      });
    });
    describe('.select', function() {
      return it('returns all complete todos', function() {
        var complete, incomplete;

        incomplete = new Todo({
          complete: false
        });
        complete = new Todo({
          complete: true
        });
        expect(Todo.select(function(t) {
          return t.complete;
        })).not.to.include(incomplete);
        return expect(Todo.select(function(t) {
          return t.complete;
        })).to.include(complete);
      });
    });
    return describe('#destroy', function() {
      return it('should remove a todo', function() {
        var todo;

        todo = new Todo({
          name: 'Foo'
        });
        todo.destroy();
        return expect(Todo.all()).not.to.include(todo);
      });
    });
  });

}).call(this);
