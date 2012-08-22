enyo.kind({
  name: "XV.Databases",
  kind: "XV.AdminObjectInterface",
  modelClass: "XM.Database",
  listClass: "XV.DatabaseSelectionList",
  formClass: "XV.DatabaseForm"
});

enyo.kind({
  name: "XV.DatabaseSelectionList",
  kind: "FittableColumns",
  fit: true,
  classes: "xv-database-selection-list",
  components: [
    {kind: "XV.ListControlBar"},
    {kind: "XV.DatabaseList"}
  ]
});


enyo.kind({
  name: "XV.DatabaseList",
  kind: "XV.ColumnarList",
  classes: "xv-database-list",
  autoFetch: true,
  events: {
    onObjectSelected: ""
  },
  collectionClass: "XM.DatabaseCollection",
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