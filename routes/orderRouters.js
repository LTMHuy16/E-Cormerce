const express = require('express');
const router = express.Router();
const {
  getOrders,
  createOrder,
  getSingleOrder,
  updateOrder,
  deleteOrder,
  getTotalSale,
} = require('../controllers/orderController');

router.get('/get/totalSale', getTotalSale);

router.get('/', getOrders);

router.get('/:id', getSingleOrder);

router.post('/', createOrder);

router.put('/:id', updateOrder);

router.delete('/:id', deleteOrder);

module.exports = router;

/**
Order Example:

{
  "orderItems" : [
    {
      "quantity": 3,
      "product" : "645761a0295f18958479c819"
    },
    {
      "quantity": 2,
      "product" : "6457628db472ee2bc6c387c8"
    }
  ],
  "shippingAddress1" : "Flowers Street , 45",
  "shippingAddress2" : "1-B",
  "city": "Prague",
  "zip": "00000",
  "country": "Czech Republic",
  "phone": "+420702241333",
  "user": "645bc77908d0366ab38f2c90"
}
 */
