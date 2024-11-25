import { router } from '@/server/trpc';
import { publicProcedure } from '@/server/middleware';
import { TRPCError } from '@trpc/server';
import { prisma } from '@/lib/db';

// interface Context {
//   user: Promise<JWTPayload | null> | null;
//   prisma: PrismaClient;
// }

export const profileRouter = router({
  getProfile: publicProcedure.query(async ({ ctx }) => {
    const user = await ctx.user;
    if (!user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You must be logged in to access this resource.',
      });
    }
    return user;
  })
});