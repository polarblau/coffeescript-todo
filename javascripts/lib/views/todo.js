(function() {
  var App, Model, _base,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.App || (this.App = {});

  (_base = this.App).Views || (_base.Views = {});

  App = this.App;

  Model = App.Models.Todo;

  App.Views.Todo = (function(_super) {
    __extends(Todo, _super);

    Todo.prototype.events = {
      'dblclick strong': 'edit',
      'click a.remove': 'remove',
      'keypress input.edit': 'updateIfEnter',
      'blur input.edit': 'stopEditing',
      'change input.complete': 'toggle'
    };

    Todo.prototype.template = Handlebars.compile($('#todo').html());

    function Todo(todo) {
      this.todo = todo;
      this.toggle = __bind(this.toggle, this);
      this.updateIfEnter = __bind(this.updateIfEnter, this);
      this.remove = __bind(this.remove, this);
      this.stopEditing = __bind(this.stopEditing, this);
      this.edit = __bind(this.edit, this);
      this.$el = $('<li/>');
      Todo.__super__.constructor.call(this);
    }

    Todo.prototype.render = function(data) {
      this.$el.html(this.template({
        todo: this.todo
      }));
      if (this.todo.complete) {
        this.$el.addClass('complete');
      }
      return this.$input = this.$el.find('input.edit');
    };

    Todo.prototype.edit = function() {
      return this.$input.show().focus();
    };

    Todo.prototype.stopEditing = function() {
      return this.$input.hide().val(this.todo.name);
    };

    Todo.prototype.remove = function() {
      Model.find(this.todo.id).destroy();
      return this.$el.remove();
    };

    Todo.prototype.updateIfEnter = function(e) {
      if (e.which === 13) {
        this.todo.name = this.$input.val();
        return this.render();
      }
    };

    Todo.prototype.toggle = function(e) {
      var complete;

      complete = $(e.target).is(':checked');
      this.todo.complete = complete;
      return this.$el.trigger('sort');
    };

    return Todo;

  })(App.Base.View);

}).call(this);
