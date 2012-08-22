enyo.kind({
  name: "XV.AdminObjectInterface",
  kind: "XV.ScreenCarousel",
  handlers: {
    onObjectSelected: "objectSelected",
    onCancelTapped: "goBack",
    onNewTapped: "newSelected",
    onDidSave: "didSave",
    onDidDestroyModel: "removeModel"
  },
  published: {
    model: null,
    modelClass: null,
    listClass: null,
    formClass: null
  },
  create: function () {
    var m = this.getModelClass(),
        list = this.getListClass(),
        form = this.getFormClass();
    this.inherited(arguments);
    m = XT.getObjectByName(m);
    this.setModel(m);
    this.createComponent({
      name: "list",
      kind: list
    });
    this.createComponent({
      name: "form",
      kind: form
    });
  },
  objectSelected: function (inSender, inEvent) {
    var m = inEvent.model;
    this.$.form.setModel(m);
    this.setCurrentView("form");
  },
  newSelected: function () {
    var m = new (this.getModel());
    this.$.form.setModel(m);
    this.$.form.setIsNew(true);
    this.setCurrentView("form");
  },
  goBack: function () {
    this.setCurrentView("list");
    return true;
  },
  didSave: function (inSender, inEvent) {
    var m = inEvent.model;
    this.waterfall("onAddModel", {model: m});
    return true;
  },
  removeModel: function (inSender, inEvent) {
    var m = inEvent.model;
    this.waterfall("onRemoveModel", {model: m});
    return true;
  }
});