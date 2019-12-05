let Order = require('../models/order.model');

module.exports.create = (req, res) => {
  const order = req.body;

  const newOrder = new Order(order);

  newOrder.save()
    .then(() => res.json({message: 'Order Created!'}))
    .catch(err => res.status(400).json({error: err, message: "Order cannot be created"}));
}

module.exports.getAll = (req, res) => {
  Order.find({user: req.params.userId}).populate('items')
    .then(orders => res.json({body: orders}))
    .catch(err => res.status(400).json({error: err, message: "orders cannot be fetched!"}));
}