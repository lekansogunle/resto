const checkJwt = require("../config/auth");

module.exports = (app) => {
  const usersResource = require("../controllers/usersController");
  const foodsResource = require("../controllers/foodsController");

  app.route("/api/test")
  .get(checkJwt, (req, res) => {
    res.send({
      msg: "test auth round trip!"
    });
  });

  app.route("/api/users")
  .post(usersResource.create);

  app.route("/api/users/:id")
  .get(usersResource.getOne);

  app.route("/api/foods")
  .post(foodsResource.create)
  .get(foodsResource.getAll);
}