  // ..........................................................
  // GLOBAL USER
  //

  enyo.kind({
    name: "XV.GlobalUserList",
    kind: "XV.List",
    label: "_globalUsers".loc(),
    collection: "XM.UserCollection",
    //parameterWidget: "XV.UserAccountListParameters",
    query: {orderBy: [
      {attribute: 'id'}
    ]},
    components: [
      {kind: "XV.ListItem", components: [
        {kind: "FittableColumns", components: [
          {kind: "XV.ListColumn", classes: "short", components: [
            {kind: "XV.ListAttr", attr: "id", classes: "bold"}
          ]},
          {kind: "XV.ListColumn", classes: "short", components: [
            {kind: "XV.ListAttr", attr: "password"}
          ]}
        ]}
      ]}
    ]
  });
