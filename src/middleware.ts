import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow Next.js assets and public images
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/slider/") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  const token =
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value;

  // Allow guests to access Home
  if (pathname === "/") {
    return NextResponse.next();
  }

  // Redirect guests to login
  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set(
      "callbackUrl",
      request.nextUrl.pathname + request.nextUrl.search
    );

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!login|register|api).*)"],
};
