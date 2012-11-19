/*jshint bitwise:true, indent:2, curly:true eqeqeq:true, immed:true,
latedef:true, newcap:true, noarg:true, regexp:true, undef:true,
trailing:true white:true*/
/*global XT:true, XM:true, XV:true, enyo:true*/

(function () {

  // ..........................................................
  // DATABASE SERVER
  //

  enyo.kind({
    name: "XV.DatabaseServerWorkspace",
    kind: "XV.Workspace",
    title: "_databaseServer".loc(),
    model: "XM.DatabaseServer"
  });

  XV.registerModelWorkspace("XM.DatabaseServer", "XV.DatabaseServerWorkspace");



}());
