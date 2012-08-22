enyo.kind({
  name: "App",
  kind: "Control",
  classes: "xt-app onyx",
  fit: true,
  create: function () {
    this.inherited(arguments);
    XT.app = this;
    Backbone.history.start();
  },
  components: [
    {name: "topToolbar", kind: "XV.TopToolbar"},
    {name: "container", kind: "XV.Container"}
  ]
});