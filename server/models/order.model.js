const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  items: [{
    type: Schema.Types.ObjectId,
    ref: 'Food'
  }],
  status: {
    type: String,
    enum: ['Added', 'Paid', 'In Delivery', 'Delivered',]
  },
  note: {
    type: String,
    trim: true
  },
  amount: {
    type: Number
  }
}, {
  timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;