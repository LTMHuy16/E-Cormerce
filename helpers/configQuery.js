require('dotenv').config();

async function checkNdisStatus(body) {
  let status = false,
    encodeAuth = Buffer.from(
      `${process.env.NDIS_USER_NAME}:${process.env.NDIS_USER_NAME}`
    ).toString('base64');

  await fetch(process.env.NDIS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + encodeAuth,
      redirect: 'follow',
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((result) => {
      result.success ? (status = true) : (status = false);
    })
    .catch((error) => {
      status = false;
    });

  return status;
}

async function createShopifyOrder(shopifyOrder) {
  let orders;

  await fetch(process.env.SHOPIFY_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': `${process.env.SHOPIFY_API_KEY}`,
    },
    body: JSON.stringify(shopifyOrder),
  })
    .then((response) => {
      orders = response.json();
    })
    .catch((error) => {
      orders = false;
    });

  return orders;
}

module.exports = { checkNdisStatus, createShopifyOrder };
