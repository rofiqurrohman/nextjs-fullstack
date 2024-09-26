import { auth } from "@/lib/auth";
import { SIGN_IN } from "@/lib/route";

export default auth(async (req) => {
  const { nextUrl } = req;

	const isAuthenticated = !!req.auth;

  if (!isAuthenticated && req.nextUrl.pathname !== SIGN_IN) {
    const newUrl = new URL(SIGN_IN, nextUrl);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ["/user/:path*"],
};