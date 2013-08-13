(function() {
  var App, Model, _base,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.App || (this.App = {});

  (_base = this.App).Views || (_base.Views = {});

  App = this.App;

  Model = App.Models.Todo;

  App.Views.Todos = (function(_super) {
    __extends(Todos, _super);

    Todos.prototype.events = {
      'submit form': 'create',
      'click p.clear a': 'removeCompleted',
      'sort ul': 'render'
    };

    Todos.prototype.template = Handlebars.compile($('#todo-list').html());

    function Todos(selector) {
      this.removeCompleted = __bind(this.removeCompleted, this);
      this.render = __bind(this.render, this);
      this.create = __bind(this.create, this);      this.$el = $(selector);
      Todos.__super__.constructor.call(this);
    }

    Todos.prototype.create = function(e) {
      var todo;

      e.preventDefault();
      todo = new Model({
        name: this.$input.val()
      });
      this.add(todo);
      return this.$input.val('');
    };

    Todos.prototype.add = function(todo) {
      var view;

      view = new App.Views.Todo(todo);
      view.render();
      return this.$list.prepend(view.$el);
    };

    Todos.prototype.render = function() {
      var todo, _i, _len, _ref, _results;

      Model.sort();
      this.$el.html(this.template());
      this.$input = this.$el.find('input.new-todo');
      this.$list = this.$el.find('#todos');
      _ref = Model.all();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        todo = _ref[_i];
        _results.push(this.add(todo));
      }
      return _results;
    };

    Todos.prototype.removeCompleted = function() {
      var todo, _i, _len, _ref;

      _ref = Model.select(function(t) {
        return t.complete;
      });
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        todo = _ref[_i];
        todo.destroy();
      }
      return this.render();
    };

    return Todos;

  })(App.Base.View);

}).call(this);
