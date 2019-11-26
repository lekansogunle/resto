const checkJwt = require("../config/auth");

module.exports = (app) => {
  const usersResource = require("../controllers/usersController");

  app.route("/api/test")
  .get(checkJwt, (req, res) => {
    res.send({
      msg: "test auth round trip!"
    });
  });

  app.route("/api/users")
  .post(usersResource.create);
}