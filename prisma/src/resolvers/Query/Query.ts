import { getUserId, getShopId, Context } from "../../utils";

export const Query = {
  me(parent, args, ctx: Context, info) {
    const id = getUserId(ctx);
    return ctx.db.query.user({ where: { id } }, info);
  },
  async allShops(parent, args, ctx: Context, info) {
    return ctx.db.query.shops({}, info);
  }
};
