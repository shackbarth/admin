

enyo.kind({
  name: "XV.Users",
  kind: "XV.AdminObjectInterface",
  modelClass: "XM.User",
  listClass: "XV.UserSelectionList",
  formClass: "XV.UserForm"
});

enyo.kind({
  name: "XV.UserSelectionList",
  kind: "FittableColumns",
  fit: true,
  classes: "xv-user-selection-list",
  components: [
    {kind: "XV.ListControlBar"},
    {kind: "Scroller", components: [
      {kind: "XV.UserList"}
    ]}
  ]
});


enyo.kind({
  name: "XV.UserList",
  kind: "XV.ColumnarList",
  classes: "xv-user-list",
  autoFetch: true,
  events: {
    onObjectSelected: ""
  },
  collectionClass: "XM.UserCollection",
  columns: [
    {name: "userId", label: "User", width: 250, field: {attr: "id"}},
    {name: "organizations", label: "Organizations", width: 300, field: {attr: "organizations", setup: "setupOrganizations"}}
  ],
  setupOrganizations: function (inSender, inEvent) {
    var t = inEvent.target, m = inEvent.model, a = inEvent.attr, v;
    v = m.get(a);
    t.setContent(v.map(function (e){return e.name}).join(", "));
  },
  rowTapped: function (inSender, inEvent) {
    var idx = inEvent.index, c = this._collection.models;
    this.doObjectSelected({model: c[idx]});
  }
});
