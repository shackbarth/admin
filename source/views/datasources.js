enyo.kind({
  name: "XV.Datasources",
  kind: "XV.AdminObjectInterface",
  modelClass: "XM.Datasource",
  listClass: "XV.DatasourceSelectionList",
  formClass: "XV.DatasourceForm"
});

enyo.kind({
  name: "XV.DatasourceSelectionList",
  kind: "FittableColumns",
  fit: true,
  classes: "xv-datasource-selection-list",
  components: [
    {kind: "XV.ListControlBar"},
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