(function() {
  var Todo, _base,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  this.App || (this.App = {});

  (_base = this.App).Models || (_base.Models = {});

  Todo = (function() {
    Todo.attributes = ['id', 'name', 'complete'];

    Todo.storage = [];

    Todo.idCounter = 0;

    Todo.generateID = function() {
      return ++Todo.idCounter;
    };

    function Todo(attrs) {
      var k, v;

      this.id = Todo.generateID();
      for (k in attrs) {
        v = attrs[k];
        if (__indexOf.call(Todo.attributes, k) >= 0) {
          this[k] = v;
        }
      }
      if (this.complete == null) {
        this.complete = false;
      }
      Todo.storage.unshift(this);
      Todo.sort();
      this;
    }

    Todo.all = function() {
      return Todo.storage;
    };

    Todo.find = function(id) {
      var todo;

      return ((function() {
        var _i, _len, _ref, _results;

        _ref = Todo.storage;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          todo = _ref[_i];
          if (todo.id === id) {
            _results.push(todo);
          }
        }
        return _results;
      })())[0];
    };

    Todo.sort = function() {
      return Todo.storage.sort(function(a, b) {
        if (a.complete === b.complete) {
          return 0;
        } else if (a.complete < b.complete) {
          return 1;
        } else {
          return -1;
        }
      });
    };

    Todo.select = function(iterator) {
      var todo, _i, _len, _ref, _results;

      _ref = Todo.storage;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        todo = _ref[_i];
        if (!!iterator(todo)) {
          _results.push(todo);
        }
      }
      return _results;
    };

    Todo.prototype.destroy = function() {
      var index, todo;

      index = ((function() {
        var _i, _len, _ref, _results;

        _ref = Todo.storage;
        _results = [];
        for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
          todo = _ref[index];
          if (todo.id === this.id) {
            _results.push(index);
          }
        }
        return _results;
      }).call(this))[0];
      return Todo.storage.splice(index, 1);
    };

    return Todo;

  })();

  (typeof exports !== "undefined" && exports !== null ? exports : this).App.Models.Todo = Todo;

}).call(this);
