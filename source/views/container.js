enyo.kind({
  name: "XV.Container",
  kind: "XV.ScreenCarousel",
  fit: false,
  classes: "xv-container",
  components: [
    {name: "dashboard", kind: "XV.Dashboard"},
    {name: "users", kind: "XV.Users"},
    {name: "organizations", kind: "XV.Organizations"},
    {name: "databases", kind: "XV.Databases"},
  ],
  create: function () {
    this.inherited(arguments);
    XT.container = this;
  }
});