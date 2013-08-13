(function() {
  var App, _base,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  this.App || (this.App = {});

  (_base = this.App).Base || (_base.Base = {});

  App = this.App;

  App.Base.View = (function() {
    function View() {
      this.delegateEvents = __bind(this.delegateEvents, this);      this.delegateEvents();
    }

    View.prototype.delegateEvents = function() {
      var callback, event, name, selector, _, _ref, _ref1, _results;

      _ref = this.events;
      _results = [];
      for (event in _ref) {
        callback = _ref[event];
        _ref1 = event.match(/^(\S+)\s*(.*)$/), _ = _ref1[0], name = _ref1[1], selector = _ref1[2];
        _results.push(this.$el.on(name, selector, this[callback]));
      }
      return _results;
    };

    return View;

  })();

}).call(this);
