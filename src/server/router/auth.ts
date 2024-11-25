import { router } from '@/server/trpc';
import { publicProcedure } from '@/server/middleware';
import { TRPCError } from '@trpc/server';
import { hash, compare } from 'bcrypt';
import { signJWT } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { signInSchema } from '@/lib/zod';


export const authRouter = router({
  login: publicProcedure
    .input(signInSchema)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;
    
      // Validasi input menggunakan zod
      try {
        signInSchema.parse({ email, password });
      } catch (error) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Invalid input',
        });
      }

      // Cek user di database
      const user = await prisma.user.findFirst({
        where: { email },
        select: {
          id: true,
          email: true,
          password: true,
          role: true,
        },
      });

      // console.log('user >>>>> ', user);

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User tidak ditemukan',
        });
      }

      // Validasi password
      const isValid = await compare(password, user.password);
      if (!isValid) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Password salah',
        });
      }

      // Generate JWT token
      const token = await signJWT({
        id: user.id,
        email: user.email,
        role: user.role,
      });


      return {
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          token,
        },
      };
    }),

  logout: publicProcedure.mutation(({ ctx }) => {
    return { success: true };
  }),
});