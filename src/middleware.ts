import { auth } from "@/lib/auth";
import { getSession } from "next-auth/react";
import { DEFAULT_REDIRECT, PUBLIC_ROUTES, ROOT, SIGN_IN } from "@/lib/route";

export default auth(async (req) => {
  const { nextUrl } = req;

	const isAuthenticated = !!req.auth;
	const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

	// if (isPublicRoute && isAuthenticated)
	// 	return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));

	// if (!isAuthenticated && !isPublicRoute)
	// 	return Response.redirect(new URL(ROOT, nextUrl));

  if (!isAuthenticated && req.nextUrl.pathname !== SIGN_IN) {
    const newUrl = new URL(SIGN_IN, nextUrl);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ["/user/:path*"],
  // matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};