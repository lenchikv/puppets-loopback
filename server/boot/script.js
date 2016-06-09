module.exports = function(app) {
var MongoDB = app.dataSources.MongoDB;

MongoDB.automigrate('customer', function(err) {
   if (err) throw (err);
   var Customer = app.models.Customer;

   Customer.create([
    {username: 'admin', email: 'john@doe.com', password: '1234567'},
    {username: 'elena', email: 'elena.vygovska@gmail.com', password: 'diamonds'}
  ], function(err, users) {
    if (err) return cb(err);
     var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;

    //create the admin role
    Role.create({
      name: 'admin'
    }, function(err, role) {
      if (err) cb(err);
       //make admin
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: users[0].id
      }, function(err, principal) {
        if (err) throw (err);
      });
    });
  });
});

};

/*User.create([
    {username: 'admin', email: 'john@doe.com', password: '1234567'},
    {username: 'elena', email: 'elena.vygovska@gmail.com', password: 'diamonds'}  ], function(err, users) {
    if (err) return cb(err);
 
    //create the admin role
    Role.create({
      name: 'admin'
    }, function(err, role) {
      if (err) cb(err);
 
      //make bob an admin
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: users[0].id
      }, function(err, principal) {
        cb(err);
      });
    });
  });*/