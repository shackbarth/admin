
(function () {
  
  XM.Organization = XM.Model.extend({
    name: "organization"
  });
  
  XM.OrganizationCollection = XM.Collection.extend({
    model: XM.Organization
  });
  
}());