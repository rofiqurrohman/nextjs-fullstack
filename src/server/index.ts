import {router } from "./trpc";
import { authRouter } from "./router/auth";
import { profileRouter } from "./router/profile";

export const appRouter = router({
  auth: authRouter,
  profile: profileRouter
});

export type AppRouter = typeof appRouter;