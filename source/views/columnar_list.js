enyo.kind({
  name: "XV.ColumnarListColumn",
  classes: "xv-columnar-list-column",
  published: {
    label: null,
    width: null,
    field: null,
    fieldName: null,
    rowHeight: null
  },
  handlers: {
    onsetup: "setupItem"
  },
  create: function () {
    var f = this.getField();
    this.inherited(arguments);
    this.setFieldName(f.attr);
    this.applyStyle("width", "%@px".f(this.getWidth()));
  },
  setupItem: function () {
    var f = this.getField(), l = this.list, s = f.setup;
    if (s && l[s]) l[s].apply(l, arguments);
    return true;
  }
});

enyo.kind({
  name: "XV.ColumnSpacer",
  classes: "xv-columnar-list-column-spacer"
});

enyo.kind({
  name: "XV.ColumnarListHeader",
  classes: "xv-columnar-list-header",
  published: {
    columns: null
  },
  create: function () {
    var c = this.getColumns(), i = 0, ch;
    this.inherited(arguments);
    for (; i < c.length; ++i) {
      ch = _.clone(c[i]);
      ch.kind = "XV.ColumnarListHeaderColumn";
      this.createComponent(ch);
    }
  }
});

enyo.kind({
  name: "XV.ColumnarListHeaderColumn",
  classes: "xv-columnar-list-header-column",
  published: {
    label: null,
    width: null
  },
  create: function () {
    this.inherited(arguments);
    this.applyStyle("width", "%@px".f(this.getWidth()));
    this.createComponent({
      kind: "XV.ColumnarListHeaderItem",
      content: this.getLabel()
    });
  }
});

enyo.kind({
  name: "XV.ColumnarListHeaderItem",
  classes: "xv-columnar-list-header-item",
  tag: "span"
});

enyo.kind({
  name: "XV.ColumnarListRow",
  classes: "xv-columnar-list-row",
  handlers: {
    ontap: "rowTapped"
  },
  create: function () {
    var c = this.getContent(), h;
    this.inherited(arguments);
    this.$.value.setContent(c);
    h = this.parent.getRowHeight();
    this.applyStyle("height", "%@px".f(h));
  },
  setContent: function (v) {
    this.$.value.setContent(v);
  },
  components: [
    {name: "value", classes: "xv-columnar-list-row-value"},
    {classes: "xv-columnar-list-row-bottom-border"}
  ],
  rowTapped: function () {
    this.bubble("onRowTapped", {index: this.index, row: this});
    return true;
  }
});

enyo.kind({
  name: "XV.ColumnarListBody",
  kind: "Scroller",
  fit: true,
  classes: "xv-columnar-list-body",
  published: {
    columns: null
  },
  create: function () {
    var c = this.getColumns(), i = 0, l = this.list, ch;
    this.inherited(arguments);
    for (; i < c.length; ++i) {
      ch = _.clone(c[i]);
      ch.kind = "XV.ColumnarListColumn";
      ch.list = l;
      ch.rowHeight = l.rowHeight;
      this.createComponent(ch);
    }
  }
});

enyo.kind({
  name: "XV.ColumnarList",
  classes: "xv-columnar-list",
  fit: true,
  published: {
    collectionClass: null,
    columns: null,
    autoFetch: false,
    map: null,
    rowHeight: 45
  },
  handlers: {
    onRowTapped: "rowTapped",
    onAddModel: "addModel",
    onRemoveModel: "removeModel"
  },
  create: function () {
    var c = this.getColumns(), i = 0, col, h;
    this.inherited(arguments);
    this.createComponent({name: "header", kind: "XV.ColumnarListHeader", columns: c});
    this.createComponent({name: "body", kind: "XV.ColumnarListBody", columns: c, list: this});
    if (this.getAutoFetch()) this.fetch();
    this.setupMap();
  },
  setupMap: function () {
    var c = this.$.body.$, i = 0, m = this.map = {}, k = _.keys(c);
    for (; i < k.length; ++i)
      if (c[k[i]].kind === "XV.ColumnarListColumn") m[c[k[i]].getFieldName()] = c[k[i]];
  },
  fetch: function () {
    var c = this._collection, o = {};
    if (!c) c = this.createCollection();
    o.success = _.bind(this.didFetch, this);
    o.error = _.bind(this.didFetchError, this);
    c.fetch(o);
  },
  createCollection: function () {
    var K = this.getCollectionClass();
    K = XT.getObjectByName(K);
    this._collection = new K();
    this._collection.on("sync", _.bind(this.didSync, this));
    return this._collection;
  },
  didFetch: function () {
    if (this.hasNode() && this.getShowing()) this.build();
  },
  didFetchError: function (err) {
    this.log(err);
  },
  didSync: function () {
    this.build();
  },
  removeModel: function (inSender, inEvent) {
    var m = inEvent.model;
    this._collection.remove(m);
    this.build();
  },
  addModel: function (inSender, inEvent) {
    var m = inEvent.model;
    this._collection.add(m);
  },
  build: function () {
    var ch = this.$.body.children[0].children, i = 0, j, c = this._collection,
        m = c.models, map = this.getMap(), attrs, a, spacer, comp;
    for (; i < ch.length; ++i) {
      // TODO: this needs to be verified as actually releasing/cleanup up
      // properly (dom node, events, references, etc)
      ch[i].destroyComponents();
    }
    if (!m || m.length <= 0) return this.render();
    i = 0;
    attrs = _.keys(m[0].attributes);
    _.each(map, function (col) {
      col.spacer = false;
    });
    for (; i < m.length; ++i) {
      for (j = 0; j < attrs.length; ++j) {
        a = attrs[j];
        if (map[a]) {
          if (!map[a].spacer) {
            map[a].createComponent({kind: "XV.ColumnSpacer"});
            map[a].spacer = true;
          }
          comp = map[a].createComponent({
            kind: "XV.ColumnarListRow",
            content: m[i].get(a),
            index: i
          });
          map[a].bubble("onsetup", {target: comp, model: m[i], attr: a, index: i});
        }
      }
    }
    this.render();
  },
  rowTapped: function () {}
});