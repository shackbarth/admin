
(function () {
  
  window.XM = XM = {};
  
  XM.Model = Backbone.Model.extend({
    idAttribute: "_id",
    initialize: function () {
      var name = this.name;
      this.urlRoot = "%@".f(name);
    }
  });
  
  XM.Collection = Backbone.Collection.extend({
    initialize: function () {
      var model = this.model, name;
      this.url = "%@s".f(model.prototype.name);
    }
  });
  
}());