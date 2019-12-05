const checkJwt = require("../config/auth");

module.exports = (app) => {
  const usersResource = require("../controllers/usersController");
  const foodsResource = require("../controllers/foodsController");
  const userOrdersResource = require("../controllers/userOrdersController");

  app.route("/api/test")
  .get(checkJwt, (req, res) => {
    res.send({
      msg: "test auth round trip!"
    });
  });

  app.route("/api/users")
  .post(usersResource.create);

  // app.route("/api/users/:id")
  // .get(usersResource.getOne);

  app.route("/api/add_user")
  .post(usersResource.addUser);

  app.route("/api/foods")
  .post(foodsResource.create)
  .get(foodsResource.getAll);


  app.route("/api/users/:userId/orders")
  .get(userOrdersResource.getAll)
  .post(checkJwt, userOrdersResource.create);
}