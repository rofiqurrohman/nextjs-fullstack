import { verifyJWT, getToken, getTokenServerSide } from '@/lib/auth';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import {env} from '@/lib/env';

export async function createContext({req, res}: CreateNextContextOptions ) {
  const token = getTokenServerSide(req);
  
  const user = token ? verifyJWT(token) : null;

  return { req, res,user }; // Jika valid, user akan berisi payload JWT
}


export type Context = Awaited<ReturnType<typeof createContext>>;