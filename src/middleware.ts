import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getTokenServerSide, verifyJWT } from '@/lib/auth';
import {env} from '@/lib/env';
import { routeAccessMap } from './lib/routeAccess';
import { SIGN_IN } from './lib/routeAccess';

export async function middleware(req: NextRequest) {
  const token = getTokenServerSide(req);
  const user = await token ? await verifyJWT(token as string) : null;
  const { pathname } = req.nextUrl;
  const role = user?.role;
  const roleLower = (user?.role as string)?.toLowerCase();

  console.log('token middleware >>>>> ',token);
  // console.log('user middleware >>>>> ',user);
  // console.log('role middleware >>>>> ',role);
  // console.log('roleLower middleware >>>>> ',roleLower);
  

  if (!user) {
    if (pathname !== SIGN_IN) {
      return NextResponse.redirect(new URL(SIGN_IN, req.url));
    }
  }


  if (user) {
    if (pathname === "/") {
      return NextResponse.redirect(new URL(`/${roleLower}`, req.url));
    }

    if (pathname === SIGN_IN) {
      return NextResponse.redirect(new URL(`/${roleLower}`, req.url));
    }
    for (const [route, allowedRoles] of Object.entries(routeAccessMap)) {
      const matcher = new RegExp(route); // Buat RegExp untuk mencocokkan rute
      if (matcher.test(pathname) && !allowedRoles.includes(role as string)) {
        // Jika rute cocok, tetapi role tidak diizinkan, redirect ke halaman role
        return NextResponse.redirect(new URL(`/${roleLower}`, req.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/","/admin/:path*", "/student/:path*", "/teacher/:path*", "/parent/:path*", "/login"],
};
