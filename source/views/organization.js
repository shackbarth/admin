enyo.kind({
  name: "XV.OrganizationForm",
  kind: "XV.Editor",
  attributes: [
    {elem: "name", field: "name"},
    {elem: "databaseServer", field: "databaseServer"},
    {elem: "description", field: "description"},
    {elem: "cloud", field: "cloud"}
  ],
  components: [
    {name: "controls", kind: "XV.EditorBar"},
    {name: "form", kind: "XV.OrganizationFormElements"}
  ]
});

enyo.kind({
  name: "XV.OrganizationFormElements",
  kind: "XV.FormElements",
  sections: [
    {label: "Organization", components: [
      {name: "name", placeholder: "_name".loc()},
      {name: "databaseServer", placeholder: "_databaseServer".loc()},
      {name: "description", placeholder: "_description".loc()},
      {name: "cloud", placeholder: "_cloud".loc()}]}
  ]
});