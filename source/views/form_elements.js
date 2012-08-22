enyo.kind({
  name: "XV.FormElements",
  classes: "xv-form-elements",
  published: {
    sections: null
  },
  create: function () {
    var s = this.getSections(), i = 0;
    this.inherited(arguments);
    for (; i < s.length; ++i) {
      s[i].kind = "XV.FormElementSection";
      this.createComponent(s[i]);
    }
  }
});

enyo.kind({
  name: "XV.FormElementSection",
  classes: "xv-form-element-section",
  published: {
    label: ""
  },
  create: function () {
    var l = this.getLabel(), c = this.components, i = 0, t;
    this.components = [];
    this.inherited(arguments);
    this.createComponent({
      classes: "xv-form-element-spacer"
    });
    for (; i < c.length; ++i) {
      if (c[i].kind) {
        t = this.createComponent(c[i], {
          classes: "xv-form-element"
        });
        this.parent.$[c[i].name] = t;
      } else {
        t = this.createComponent({
          kind: "onyx.InputDecorator",
          classes: "xv-form-element"
        });
        t = t.createComponent(c[i], {
          kind: "onyx.Input"
        });
        this.parent.$[c[i].name] = t;
      }
    }
    this.createComponent({
      classes: "xv-form-element-section-label",
      content: l
    });
  }
});