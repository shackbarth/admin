enyo.kind({
  name: "XV.EditorBar",
  kind: "FittableColumns",
  classes: "xv-editor-bar",
  components: [
    {name: "cancel", kind: "onyx.Button", content: "Cancel", ontap: "cancelTapped"},
    {name: "save", kind: "onyx.Button", content: "Save", ontap: "saveTapped"},
    {name: "delete", kind: "onyx.Button", content: "Delete", ontap: "deleteTapped"}
  ],
  cancelTapped: function () {
    this.bubble("onCancelTapped");
  },
  saveTapped: function () {
    this.bubble("onSaveTapped");
  },
  deleteTapped: function () {
    this.bubble("onDeleteTapped");
  }
});