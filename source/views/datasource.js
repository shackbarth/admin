enyo.kind({
  name: "XV.DatasourceForm",
  kind: "XV.Editor",
  attributes: [
    {elem: "name", field: "name"},
    {elem: "hostname", field: "hostname"},
    {elem: "port", field: "port"},
    {elem: "description", field: "description"},
    {elem: "location", field: "location"}
  ],
  components: [
    {name: "controls", kind: "XV.EditorBar"},
    {name: "form", kind: "XV.DatasourceFormElements"}
  ]
});

enyo.kind({
  name: "XV.DatasourceForm",
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
  attributes: [
    {elem: "name", field: "name"},
    {elem: "hostname", field: "hostname"},
    {elem: "port", field: "port"},
    {elem: "description", field: "description"},
    {elem: "location", field: "location"}
  ],
  components: [
    {name: "controls", kind: "XV.DatasourceEditorBar"},
    {name: "form", kind: "XV.DatasourceFormElements"}
  ],
  cancelTapped: function () {
    this.setIsNew(false);
    this.setModel(null);
    this.clear();
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

enyo.kind({
  name: "XV.DatasourceEditorBar",
  kind: "FittableColumns",
  classes: "xv-editor-bar",
  components: [
    {name: "cancel", kind: "onyx.Button", content: "Cancel", ontap: "cancelTapped"}
  ],
  cancelTapped: function () {
    this.bubble("onCancelTapped");
  }
});

enyo.kind({
  name: "XV.DatasourceFormElements",
  kind: "XV.FormElements",
  sections: [
    {label: "Datasource", components: [
      {name: "name", placeholder: "_name".loc()},
      {name: "hostname", placeholder: "_hostname".loc()},
      {name: "port", placeholder: "_port".loc()},
      {name: "description", placeholder: "_description".loc()},
      {name: "location", placeholder: "_location".loc()}]}
  ]
});