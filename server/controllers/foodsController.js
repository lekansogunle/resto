let Food = require('../models/food.model');

module.exports.create = (req, res) => {
  const food = req.body;

  const newFood = new Food(food);

  newFood.save()
    .then(() => res.json({message: 'Food Created!'}))
    .catch(err => res.status(400).json({error: err, message: "Food cannot be created"}));
}

module.exports.getAll = (req, res) => {

  Food.find()
    .then(foods => res.json({body: foods}))
    .catch(err => res.status(400).json({error: err, message: "foods cannot be fetched!"}));
}