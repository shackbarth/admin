enyo.kind({
  name: "XV.ListControlBar",
  classes: "xv-controlbar",
  components: [
    {name: "new", kind: "onyx.Button", content: "New", ontap: "newTapped"}
  ],
  newTapped: function () {
    this.bubble("onNewTapped");
  }
})