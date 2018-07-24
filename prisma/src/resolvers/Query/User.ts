import { Context, getUserId, getRole, getShopIdFromUserId } from "../../utils";

export const User = {
  // Grab only orders made to the selectedShop of the user,
  // So that he cannot add an order to his cart with product
  // That were ordered from another Shop (that can potentially not be existing)
  /*
  async orders(parent, _, ctx: Context, info) {
    const userId = getUserId(ctx);
    const role = getRole(ctx);
    let shopId;
    if (role == "ADMIN")
      shopId = await getShopIdFromUserId(userId, ctx);

    const ordersIds = parent.orders.map(order => order.id);

    if (role == "ADMIN")
      return ctx.db.query.orders({
        where: {
          id_in: ordersIds,
          owner: { id: userId },
          receiver: { id: shopId }
        }
      }, info)
    else
      return ctx.db.query.orders({
        where: {
          id_in: ordersIds,
          owner: { id: userId }
        }
      }, info)
  },

  async cart(parent, _, ctx: Context, info) {
    const userId = getUserId(ctx);
    const role = getRole(ctx);
    let shopId;
    if (role == "ADMIN")
      shopId = await getShopIdFromUserId(userId, ctx);

    const lineItemIds = parent.cart.map(lineItem => lineItem.id);

    if (role == "ADMIN")
      return ctx.db.query.orderLineItems({
        where: {
          id_in: lineItemIds,
          shop: { id: shopId },
          owner: { id: userId },
        }
      }, info)
    else
      return ctx.db.query.orderLineItems({
        where: {
          id_in: lineItemIds,
          owner: { id: userId },
        }
      }, info)
  },*/
}

