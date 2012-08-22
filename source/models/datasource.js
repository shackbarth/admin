
(function () {
  
  XM.Datasource = XM.Model.extend({
    name: "datasource"
  });
  
  XM.DatasourceCollection = XM.Collection.extend({
    model: XM.Datasource
  });
  
}());