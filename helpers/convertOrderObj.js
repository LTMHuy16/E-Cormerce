// CONVERT NDIS ORDER OBJECT TO SHOPIFY ORDER
function convertOrderObj(ndisOrder) {
  if (
    !ndisOrder?.items ||
    !Array.isArray(ndisOrder?.items) ||
    !ndisOrder?.items.length > 0
  )
    return false;

  let shopifyOrder = {
    order: {
      line_items: [],
      tax_lines: [],
      total_tax: 0,
    },
  };

  ndisOrder.items.forEach((item) => {
    shopifyOrder.order.line_items.push({
      variant_id: item.variant_id,
      title: item.product_category_item,
      price: item.per_unit_price,
      quantity: item.quantity,
    });
  });

  return shopifyOrder;
}

module.exports = { convertOrderObj };
