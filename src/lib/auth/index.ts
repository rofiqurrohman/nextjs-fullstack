import NextAuth from 'next-auth';
import { ZodError } from 'zod';
import { PrismaAdapter } from '@auth/prisma-adapter';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { prisma } from '@/lib/db';
import { compare } from 'bcryptjs';
import { signInSchema } from '@/lib/zod';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'example@email.com' },
        password: { label: 'Password', type: 'password', placeholder: '******' },
      },
      authorize: async (credentials): Promise<any> => {
        try {
          const { email, password } = await signInSchema.parseAsync(credentials);

          if (!email ) {
            return null;
          }

          const user = await prisma.user.findUnique({
            where: { email },
          });

          console.log("user credential :", user);
          

          if (!user) {
            throw new Error("User not found.")
          }

          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null;
          }
        }
      },
    }),
    Google,
  ],
  callbacks: {},
  session: { strategy: "jwt" },
});
