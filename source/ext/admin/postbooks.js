/*jshint bitwise:true, indent:2, curly:true eqeqeq:true, immed:true,
latedef:true, newcap:true, noarg:true, regexp:true, undef:true,
trailing:true white:true*/
/*global XT:true, XV:true, enyo:true*/

(function () {

  XT.extensions.admin.initPostbooks = function () {

    // ..........................................................
    // APPLICATION
    //
    var panels = [
      {name: "globalUserList", kind: "XV.GlobalUserList"},
      {name: "organizationList", kind: "XV.OrganizationList"},
      {name: "databaseServerList", kind: "XV.DatabaseServerList"}
    ];

    XT.app.$.postbooks.appendPanels("setup", panels);

  };

}());
