
enyo.kind({
  name: "XV.OrganizationEditor",
  kind: "FittableRows",
  classes: "xv-organization-editor",
  handlers: {
    onObjectSelected: "organizationSelected"
  },
  components: [
    {kind: "FittableColumns", components: [
      {name: "selected", kind: "XV.SelectedOrganizations"},
      {name: "list", kind: "XV.NestedOrganizationList"}]}
  ],
  clear: function () {
    this.$.selected.clear();
  },
  organizationSelected: function (inSender, inEvent) {
    var m = inEvent.model;
    this.$.selected.selectOrganization(m.get("name"));
    return true;
  }
});

enyo.kind({
  name: "XV.SelectedOrganizations",
  kind: "Repeater",
  classes: "xv-selected-list",
  fit: true,
  published: {
    selectedOrganizations: null
  },
  create: function () {
    var s = this.getSelectedOrganizations();
    this.inherited(arguments);
    if (!s) this.setSelectedOrganizations([]);
  },
  handlers: {
    onSetupItem: "setupItem",
    onEntryUpdated: "entryUpdated",
    onEntryRemoved: "entryRemoved"
  },
  setupItem: function (inSender, inEvent) {
    var s = this.getSelectedOrganizations(), idx = inEvent.index, item, row;
    item = inEvent.item;
    row = item.children[0];
    row.$.name.setContent(s[idx].name);
    row.$.username.setValue(s[idx].username);
    return true;
  },
  selectOrganization: function (name, username) {
    var s = this.getSelectedOrganizations(), v;
    v = _.pluck(s, "name");
    if (v.indexOf(name) !== -1) return;
    s.push({name: name, username: username || ""});
    this.setSelectedOrganizations(s);
    this.selectedOrganizationsChanged();
  },
  removeOrganization: function (name) {
    var s = this.getSelectedOrganizations(), v, i;
    v = _.pluck(s, "name");
    i = v.indexOf(name);
    s.splice(i, 1);
    this.setSelectedOrganizations(s);
    this.selectedOrganizationsChanged();
  },
  selectedOrganizationsChanged: function () {
    var s = this.getSelectedOrganizations();
    this.setCount(s.length);
  },
  components: [
    {kind: "XV.SelectedOrganizationItem"}
  ],
  clear: function () {
    this.setCount(0);
    this.setSelectedOrganizations([]);
  },
  entryUpdated: function (inSender, inEvent) {
    var s = this.getSelectedOrganizations(), name, username, v, i;
    name = inEvent.name;
    username = inEvent.username;
    v = _.pluck(s, "name");
    i = v.indexOf(name);
    s[i].username = username;
    this.log(s);
    this.setSelectedOrganizations(s);
  },
  entryRemoved: function (inSender, inEvent) {
    this.removeOrganization(inEvent.name);
  }
});

enyo.kind({
  name: "XV.SelectedOrganizationItem",
  kind: "FittableColumns",
  classes: "xv-selected-organization-item",
  components: [
    {name: "x", classes: "icon", src: "assets/closing-x.png", kind: "onyx.IconButton", ontap: "remove"},
    {name: "name", classes: "name", tag: "span"},
    {name: "ok", classes: "icon ok", src: "assets/accept-check.png", kind: "onyx.IconButton", ontap: "ok", showing: false},
    {kind: "onyx.InputDecorator", classes: "username", components: [
      {name: "username", kind: "onyx.Input", placeholder: "_username".loc(), oninput: "usernameChanged"}]}
  ],
  ok: function (inSender, inEvent) {
    var o = inEvent.originator, p = o.parent, name, username, idx = inEvent.index;
    name = p.$.name.getContent();
    username = p.$.username.getValue();
    o.setShowing(false);
    this.bubble("onEntryUpdated", {name: name, username: username});
  },
  remove: function (inSender, inEvent) {
    var o = inEvent.originator, p = o.parent, name;
    name = p.$.name.getContent();
    this.bubble("onEntryRemoved", {name: name});
  },
  usernameChanged: function (inSender, inEvent) {
    var o = inEvent.originator, p = o.owner;
    p.$.ok.setShowing(true);
  }
});

enyo.kind({
  name: "XV.NestedOrganizationList",
  kind: "XV.ColumnarList",
  events: {
    onObjectSelected: ""
  },
  classes: "xv-nested-organization-list",
  autoFetch: true,
  collectionClass: "XM.OrganizationCollection",
  columns: [
    {name: "name", label: "Name", width: 300, field: {attr: "name"}}
  ],
  rowTapped: function (inSender, inEvent) {
    var idx = inEvent.index, c = this._collection.models;
    this.doObjectSelected({model: c[idx]});
  }
});

enyo.kind({
  name: "XV.UserForm",
  kind: "XV.Editor",
  attributes: [
    {elem: "id", field: "id"},
    {elem: "password", field: "password"},
    {elem: "organizations", field: "organizations", render: "renderOrganizations", save: "saveOrganizations"}
  ],
  components: [
    {name: "controls", kind: "XV.EditorBar"},
    {name: "form", kind: "XV.UserFormElements"}
  ],
  renderOrganizations: function (model, attr, elem) {
    var o = model.get("organizations");
    _.each(o, function (g) {
      elem.$.selected.selectOrganization(g.name, g.username);
    }, this);
    elem.$.list.fetch();
  },
  saveOrganizations: function (model, attr, elem) {
    var o = this.$.form.$.organizations.$.selected.getSelectedOrganizations();
    model.set("organizations", o);
  }
});

enyo.kind({
  name: "XV.UserFormElements",
  kind: "XV.FormElements",
  sections: [
    {label: "User", components: [
      {name: "id", placeholder: "_id".loc()},
      {name: "password", type: "password", placeholder: "_password".loc()}]},
    {label: "Organizations", components: [
      {name: "organizations", fit: true, height: 250, kind: "XV.OrganizationEditor"}]}
  ]
});