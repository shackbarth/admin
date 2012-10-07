enyo.kind({
  name: "XV.Datasources",
  kind: "XV.ScreenCarousel",
  handlers: {
    onObjectSelected: "objectSelected",
    onCancelTapped: "goBack",
  },
  published: {
    model: null,
    modelClass: "XM.Datasource",
    listClass: "XV.DatasourceSelectionList",
    formClass: "XV.DatasourceForm"
  },
  create: function () {
    var m = this.getModelClass(),
        list = this.getListClass(),
        form = this.getFormClass();
    this.inherited(arguments);
    m = XT.getObjectByName(m);
    this.setModel(m);
    this.createComponent({
      name: "list",
      kind: list
    });
    this.createComponent({
      name: "form",
      kind: form
    });
  },
  objectSelected: function (inSender, inEvent) {
    var m = inEvent.model;
    this.$.form.setModel(m);
    this.setCurrentView("form");
  },
  goBack: function () {
    this.setCurrentView("list");
    return true;
  }
});

enyo.kind({
  name: "XV.DatasourceSelectionList",
  kind: "FittableColumns",
  fit: true,
  classes: "xv-datasource-selection-list",
  components: [
    {kind: "XV.DatasourceList"}
  ]
});


enyo.kind({
  name: "XV.DatasourceList",
  kind: "XV.ColumnarList",
  classes: "xv-datasource-list",
  autoFetch: true,
  events: {
    onObjectSelected: ""
  },
  collectionClass: "XM.DatasourceCollection",
  columns: [
    {name: "name", label: "Name", width: 200, field: {attr: "name"}},
    {name: "description", label: "Description", width: 400, field: {attr: "description"}},
    //{name: "cloud", label: "Cloud", width: 250, field: {attr: "cloud"}}
  ],
  rowTapped: function (inSender, inEvent) {
    var idx = inEvent.index, c = this._collection.models;
    this.doObjectSelected({model: c[idx]});
  }
});