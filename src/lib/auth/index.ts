import { z } from 'zod';
import { jwtVerify, SignJWT } from 'jose';
import { getCookie, getCookies, setCookie, deleteCookie, hasCookie } from 'cookies-next';
import {env} from '@/lib/env';

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key'
);

export const loginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
});

export async function signJWT(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret);
}

export async function verifyJWT(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    return null;
  }
}

export const setToken = (token: string) => {
  setCookie(env.TOKEN_NAME, token);
};

export const clearToken = () => {
  deleteCookie(env.TOKEN_NAME);
};

export const getToken = () => {
  return getCookie(env.TOKEN_NAME);
};

export const getTokenServerSide = (req) => {
  return req.headers.get('cookie')?.split(`${env.TOKEN_NAME}=`)[1]
};