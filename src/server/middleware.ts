import { TRPCError } from '@trpc/server';
import { t } from './trpc'; // Inisialisasi tRPC instance

// Middleware untuk rute publik
export const publicProcedure = t.procedure;

// Middleware untuk rute yang membutuhkan autentikasi
export const authMiddleware = t.procedure.use(async ({ next, ctx }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to access this resource.',
    });
  }
  return next({
    ctx
  });
});

// Middleware untuk role-based access (opsional)
export const roleProcedure = (allowedRoles: string[]) =>
  authMiddleware.use(async ({ ctx, next }) => {
    const user = await ctx.user;
    if (!allowedRoles.includes(user?.role as string)) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'You do not have access to this resource.',
      });
    }
    return next();
  });
