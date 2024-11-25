import { z } from "zod";

// const envSchema = z.object({
//   TOKEN_NAME: z.string().min(1),
// });

// export const env = envSchema.parse(process.env);
export const env = {
  TOKEN_NAME: process.env.NEXT_PUBLIC_TOKEN_NAME,
};