import { appRouter } from "@/server";
import { createContext } from "@/server/context";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createNextApiHandler } from '@trpc/server/adapters/next';

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext,
  });

export { handler as GET, handler as POST };

// export default createNextApiHandler({
//   router: appRouter,
//   createContext, // Pastikan ini sesuai dengan context yang mendukung `res`
// });