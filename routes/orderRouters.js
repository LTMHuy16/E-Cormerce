const express = require('express');
const router = express.Router();
const {
  checkNdisStatus,
  createShopifyOrder,
} = require('../helpers/configQuery');
const { validateNdisFields } = require('../helpers/validateNdis');
const { convertOrderObj } = require('../helpers/convertOrderObj');


router.post('/ndis', async (req, res) => {
  console.log('Create order');
  try {
    const { status, message } = await validateNdisFields(req.body);
    if (!status) throw Error(message);

    const canCreateOrder = await checkNdisStatus(req.body);
    if (!canCreateOrder) throw Error("Can't create order in NDIS system.");

    const shopifyOrder = convertOrderObj(req.body);
    const orders = await createShopifyOrder(shopifyOrder);
    if (!orders) throw Error("Can't not create order in shopify store.");

    res.status(201).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
