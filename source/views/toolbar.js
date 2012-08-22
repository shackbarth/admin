enyo.kind({
  name: "XV.TopToolbar",
  kind: "onyx.Toolbar",
  components: [
    {content: "XTUPLE SERVICES: "},
    {content: "Administration"},
    {name: "buttons", kind: "onyx.RadioGroup", ontap: "buttonTapped", components: [
      {content: "Dashboard"},
      {content: "Users"},
      {content: "Organizations"},
      {content: "Databases"},
      {content: "Datasources"}]}
  ],
  setActive: function (name) {
    var c = this.$.buttons.children, v;
    v = _.find(c, function (btn) {
      return btn.getContent().toLowerCase() === name;
    });
    if (v) v.setActive(true);
  },
  buttonTapped: function (inSender, inEvent) {
    var o = inEvent.originator;
    if (!o.getActive()) return;
    XT.router.navigate("#/%@".f(o.getContent().toLowerCase()), {trigger: true});
  }
});