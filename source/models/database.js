
(function () {
  
  XM.Database = XM.Model.extend({
    name: "database"
  });
  
  XM.DatabaseCollection = XM.Collection.extend({
    model: XM.Database
  });
  
}());