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