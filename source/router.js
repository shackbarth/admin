(function () {
  var Router = Backbone.Router.extend({
    routes: {
      "users":      "users",
      "dashboard":  "dashboard",
      "organizations": "organizations",
      "databases": "databases",
      "datasources": "datasources",
      "":           "defaultRoute",
    },
    defaultRoute: function () {
      this.navigate("#/dashboard", {trigger: true});
    },
    users: function () {
      XT.container.setCurrentView("users");
      XT.app.$.topToolbar.setActive("users");
    },
    organizations: function () {
      XT.container.setCurrentView("organizations");
      XT.app.$.topToolbar.setActive("organizations");
    },
    databases: function () {
      XT.container.setCurrentView("databases");
      XT.app.$.topToolbar.setActive("databases");
    },
    dashboard: function () {
      XT.container.setCurrentView("dashboard");
      XT.app.$.topToolbar.setActive("dashboard");
    },
    datasources: function () {
      XT.container.setCurrentView("datasources");
      XT.app.$.topToolbar.setActive("datasources");
    }
  });
  XT.router = new Router();
}());