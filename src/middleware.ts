
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token =
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value;

  const pathname = request.nextUrl.pathname;

  // Allow Home page for guests
  if (pathname === "/") {
    return NextResponse.next();
  }

  // Redirect guests to login
  if (!token) {
    const loginUrl = new URL("/login", request.url);

    loginUrl.searchParams.set("callbackUrl", pathname);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!login|register|api|_next/static|_next/image|favicon.ico).*)",
  ],
};
