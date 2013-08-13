(function() {
  var app;

  new App.Models.Todo({
    name: 'Clean dishes'
  });

  new App.Models.Todo({
    name: 'Wash laundy',
    complete: true
  });

  app = new App.Views.Todos('#main');

  app.render();

}).call(this);
