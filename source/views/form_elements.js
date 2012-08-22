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
      this.createComponent({
        kind: "XV.FormElement",
        label: c[i].name,
        component: c[i]
      });
    }
    this.createComponent({
      classes: "xv-form-element-section-label",
      content: l
    });
  }
});

enyo.kind({
  name: "XV.FormElement",
  classes: "xv-form-element",
  published: {
    label: "",
    component: null
  },
  create: function () {
    var l = this.getLabel(), c = this.getComponent(), t;
    this.inherited(arguments);
    this.createComponent({classes: "xv-form-element-spacer"});
    if (c.kind) {
      t = this.createComponent(c, {classes: "xv-form-element-item"});
      if (c.fit) this.applyStyle("display", "block");
      if (c.height) this.applyStyle("height", "%@px".f(c.height));
    } else {
      t = this.createComponent({kind: "onyx.InputDecorator", classes: "xv-form-element-item"});
      t = t.createComponent(c, {kind: "onyx.Input"});
    }
    // make sure the editor can find this stuff
    this.parent.parent.$[c.name] = t;
    this.createComponent({
      classes: "xv-form-element-section-label",
      content: l
    });
  }
});