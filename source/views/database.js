enyo.kind({
  name: "XV.DatabaseForm",
  kind: "XV.Editor",
  attributes: [
    {elem: "name", field: "name"},
    {elem: "hostname", field: "hostname"},
    {elem: "port", field: "port"},
    {elem: "description", field: "description"},
    {elem: "location", field: "location"},
    {elem: "password", field: "password"},
    {elem: "user", field: "user"}
  ],
  components: [
    {name: "controls", kind: "XV.EditorBar"},
    {name: "form", kind: "XV.DatabaseFormElements"}
  ]
});

enyo.kind({
  name: "XV.DatabaseFormElements",
  kind: "XV.FormElements",
  sections: [
    {label: "Database Server", components: [
      {name: "name", placeholder: "_name".loc()},
      {name: "hostname", placeholder: "_hostname".loc()},
      {name: "port", placeholder: "_port".loc()},
      {name: "description", placeholder: "_description".loc()},
      {name: "location", placeholder: "_location".loc()},
      {name: "password", placeholder: "_password".loc()},
      {name: "user", placeholder: "_user".loc()}]}
  ]
});