const checkJwt = require("../config/auth");

module.exports = (app) => {
  const usersResource = require("../controllers/usersController");
  const foodsResource = require("../controllers/foodsController");
  const ordersResource = require("../controllers/ordersController");
  const userOrdersResource = require("../controllers/userOrdersController");

  const cloudinary = require('cloudinary');
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

  app.route("/api/picture_upload")
  .post((req, res) => {

    const picture = req.files.file;
    cloudinary.uploader.upload(picture.path)
      .then(results => res.json(results))
      .catch(err => res.status(400).json(err));

  });

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
  .post(checkJwt, foodsResource.create)
  .get(foodsResource.getAll);

  app.route("/api/orders")
  .get(checkJwt, ordersResource.getAll);

  app.route("/api/users/:userId/orders")
  .get(checkJwt, userOrdersResource.getAll)
  .post(checkJwt, userOrdersResource.create);
}