//enyo.kind({
//  name: "XV.Organizations",
//  kind: "XV.ScreenCarousel",
//  handlers: {
//    onOrganizationSelected: "organizationSelected",
//    onCancelTapped: "goBack",
//    onNewTapped: "newSelected"
//  },
//  components: [
//    {name: "list", kind: "XV.OrganizationSelectionList"},
//    {name: "form", kind: "XV.OrganizationForm"}
//  ],
//  organizationSelected: function (inSender, inEvent) {
//    var m = inEvent.model;
//    this.$.form.setModel(m);
//    this.setCurrentView("form");
//  },
//  newSelected: function () {
//    var m = new XM.Organization();
//    this.$.form.setModel(m);
//    this.$.form.setIsNew(true);
//    this.setCurrentView("form");
//  },
//  goBack: function () {
//    this.setCurrentView("list");
//    return true;
//  }
//});

enyo.kind({
  name: "XV.Organizations",
  kind: "XV.AdminObjectInterface",
  modelClass: "XM.Organization",
  listClass: "XV.OrganizationSelectionList",
  formClass: "XV.OrganizationForm"
});

enyo.kind({
  name: "XV.OrganizationSelectionList",
  kind: "FittableColumns",
  fit: true,
  classes: "xv-organization-selection-list",
  components: [
    {kind: "XV.ListControlBar"},
    {kind: "XV.OrganizationList"}
  ]
});


enyo.kind({
  name: "XV.OrganizationList",
  kind: "XV.ColumnarList",
  classes: "xv-organization-list",
  autoFetch: true,
  events: {
    onObjectSelected: ""
  },
  collectionClass: "XM.OrganizationCollection",
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

//enyo.kind({
//  name: "XV.Organizations",
//  fit: true,
//  classes: "xv-organizations",
//  components: [
//    {content: "ORGANIZATIONS"},
//    {kind: "XV.ListControlBar"},
//    {name: "organizationList", kind: "XV.OrganizationList"}
//  ]
//});
//
//enyo.kind({
//  name: "XV.OrganizationList",
//  kind: "XV.List",
//  classes: "xv-organization-list",
//  create: function () {
//    this.inherited(arguments);
//    this.fetch();
//  },
//  published: {
//    label: "Organization List",
//    collection: "XM.OrganizationCollection"
//  },
//  components: [
//    {kind: "XV.ListItem", components: [
//      {kind: "FittableColumns", components: [
//        {kind: "XV.ListColumn", components: [
//          {kind: "XV.ListAttr", attr: "name"},
//          {kind: "XV.ListAttr", attr: "description"},
//          {kind: "XV.ListAttr", attr: "cloud"}]}]}]}
//  ]
//});