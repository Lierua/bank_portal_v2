import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const loggedIn = request.cookies.get("dev-login");

  const isLoginPage = request.nextUrl.pathname.startsWith("/login");

  // block protected routes
  if (!loggedIn && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // prevent logged-in users from login page
  if (loggedIn && isLoginPage) {
    return NextResponse.redirect(new URL("/requests", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
