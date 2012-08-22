
(function () {
  
  XM.User = XM.Model.extend({
    name: "user"
  });
  
  XM.UserCollection = XM.Collection.extend({
    model: XM.User
  });
  
}());