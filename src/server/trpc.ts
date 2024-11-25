import { initTRPC } from "@trpc/server";
import { Context } from "@/server/context";

export const t = initTRPC.context<Context>().create();

export const router = t.router;
// export const authMiddleware = t.middleware(async ({ next, ctx }) => {
//   if (!ctx.user) {
//     throw new TRPCError({
//       code: 'UNAUTHORIZED',
//       message: 'You must be logged in to access this resource.',
//     });
//   }
//   return next({
//     ctx: {
//       user: ctx.user, // Tambahkan data user ke context
//     },
//   });
// });


// export const publicProcedure = t.procedure;

// export const authedProcedure = t.procedure.use(authMiddleware);