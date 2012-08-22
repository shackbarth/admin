enyo.kind({
  name: "XV.Editor",
  published: {
    model: null,
    attributes: null,
    isNew: false
  },
  handlers: {
    onCancelTapped: "cancelTapped",
    onSaveTapped: "saveTapped",
    onDeleteTapped: "deleteTapped"
  },
  events: {
    onDidSave: "",
    onDidDestroyModel: ""
  },
  cancelTapped: function () {
    this.setIsNew(false);
    this.setModel(null);
    this.clear();
  },
  deleteTapped: function () {
    var m = this.getModel();
    m.destroy({
      success: _.bind(this.didDelete, this),
      wait: true
    });
  },
  didDelete: function (model) {
    this.doDidDestroyModel({model: model});
    this.bubble("onCancelTapped");
  },
  saveTapped: function () {
    var m = this.getModel(), a = this.getAttributes(),
        f = this.$.form, e = f.$, o = {};
    if (!m || !a || !f) return;
    _.each(a, function (attr) {
      if (!e[attr.elem]) return;
      if (!attr.save) {
        m.set(attr.field, e[attr.elem].getValue());
      }
      else this[attr.save](m, attr, e[attr.elem]);
    }, this);
    o.success = _.bind(this.saveComplete, this);
    o.error = function () {alert("err");};
    m.save(null, o);
  },
  saveComplete: function () {
    var m = this.getModel();
    if (this.getIsNew()) this.doDidSave({model: m});
    this.bubble("onCancelTapped");
  },
  willActivate: function () {
    this.populate();
  },
  populate: function () {
    var m = this.getModel(), a = this.getAttributes(),
        f = this.$.form, e = f.$;
    if (!m || !a || !f) return;
    _.each(a, function (attr) {
      if (!e[attr.elem]) return;
      if (!attr.render) e[attr.elem].setValue(m.get(attr.field) || "");
      else this[attr.render](m, attr, e[attr.elem]);
    }, this);
  },
  clear: function () {
    var a = this.getAttributes(), f = this.$.form, e = f.$;
    if (!a || !e) return;
    _.each(a, function (attr) {
      var n = e[attr.elem];
      if (!n) return;
      if (n.clear) n.clear();
      else if (n.kind.match(/input/gi)) n.setValue("");
      else n.setContent("");
    });
  }
});