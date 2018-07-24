import { Context, getUserId } from '../../utils';
import { UserAdminUpdateInput,UserUpdateInput } from '../../generated/prisma';

export const user = {
  myupdateUserAdmin(parent, args, ctx: Context, info) {
    const userId = getUserId(ctx);

    const data: UserAdminUpdateInput = {
      ...(args.firstName && { firstName: args.firstName }),
      ...(args.lastName && { lastName: args.lastName }),
      ...(args.oneSignalUserId && { oneSignalUserId: args.oneSignalUserId }),
      ...(args.selectedShopId && { selectedShop: { connect: { id: args.selectedShopId } } }),
    };

    return ctx.db.mutation.updateUser({
      where: { id: userId },
      data,
    }, info);
  },
  myupdateUser(parent, args, ctx: Context, info) {
    const userId = getUserId(ctx);

    const data: UserUpdateInput = {
      ...(args.firstName && { firstName: args.firstName }),
      ...(args.lastName && { lastName: args.lastName }),
      ...(args.oneSignalUserId && { oneSignalUserId: args.oneSignalUserId })
    };

    return ctx.db.mutation.updateUser({
      where: { id: userId },
      data,
    }, info);
  }
}