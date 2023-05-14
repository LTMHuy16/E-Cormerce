const { checkRequireFields, checkMongooseId } = require('../validators/validator');
const OrderItem = require('../models/orderItemModel');
const Order = require('../models/orderModel');

async function getOrders(req, res) {
  const orders = await Order.find().populate('user', 'name');
  if (!orders) res.status(400).json({ error: 'No product was found' });

  res.status(200).json(orders);
}

async function createOrder(req, res) {
  try {
    checkRequireFields(
      ['orderItems', 'shippingAddress1', 'city', 'zip', 'country', 'phone'],
      req.body
    );

    // create orderItem in DB
    const orderItems = Promise.all(
      req.body.orderItems.map(async (orderItem) => {
        let newOrderItem = await OrderItem.create({
          quantity: orderItem.quantity,
          product: orderItem.product,
        });

        if (newOrderItem) return newOrderItem._id;
      })
    );

    const orderItemIdsResolve = await orderItems;

    if (!orderItemIdsResolve)
      throw Error('Cant not create order items for your order.');

    req.body.orderItems = orderItemIdsResolve;

    // calculate total price of order
    let totalPrices = await Promise.all(
      orderItemIdsResolve.map(async (orderItemId) => {
        const orderItem = await OrderItem.findById(orderItemId).populate(
          'product',
          'price'
        );

        const totalPrice = orderItem.product.price * orderItem.quantity;

        return totalPrice;
      })
    );

    const totalPrice = totalPrices.reduce((a, b) => a + b, 0);
    console.log(totalPrices);
    console.log(totalPrice);

    const newOrder = await Order.create({ ...req.body, totalPrice });
    if (!newOrder) throw Error("Can't create new order.");

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getSingleOrder(req, res) {
  try {
    checkRequireFields('id', req.params);
    checkMongooseId(req.params.id);

    const order = await Order.find({ _id: req.params.id })
      .populate('user', 'name')
      .populate({
        path: 'orderItems',
        populate: { path: 'product', populate: 'category' },
      });

    if (!order)
      res
        .status(404)
        .json({ error: `Cant found the order with id ${req.params.id}` });

    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function updateOrder(req, res) {
  try {
    checkRequireFields('id', req.params);
    checkMongooseId(req.params.id);

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      { new: true }
    )
      .populate('user', 'name')
      .populate({
        path: 'orderItems',
        populate: { path: 'product', populate: 'category' },
      });

    if (!order)
      throw Error(`Can't not updated product with id '${req.params.id}'`);

    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteOrder(req, res) {
  try {
    checkRequireFields('id', req.params);
    checkMongooseId(req.params.id);

    const removedOrder = await Order.findByIdAndRemove(
      req.params.id,
      {
        status: req.body.status,
      },
      { new: true }
    );

    if (removedOrder) {
      await removedOrder.orderItems.map(async (orderItem) => {
        await OrderItem.findByIdAndRemove(orderItem.id);
      });
    }

    if (!removedOrder)
      throw Error(`Can't not remove product with id '${req.params.id}'`);

    res.status(200).json({ success: true, message: 'The order is deleted.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getTotalSale(req, res) {
  const totalSales = await Order.aggregate([
    { $group: { _id: null, totalSales: { $sum: '$totalPrice' } } },
  ]);

  if (!totalSales)
    res.status(400).json({ error: 'The order can not be generated.' });

  res.status(200).json({ totalSales: totalSales.pop().totalSales });
}

module.exports = {
  getOrders,
  getSingleOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  getTotalSale,
};
