import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAdmin } from "@/lib/admin-auth";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Protect /control routes (except /control/login)
  if (pathname.startsWith("/control") && pathname !== "/control/login") {
    const token = request.cookies.get("admin_token")?.value;

    if (!token || !(await verifyAdmin(token))) {
      return NextResponse.redirect(new URL("/control/login", request.url));
    }
  }

  // Redirect /control to /control/status
  if (pathname === "/control") {
    return NextResponse.redirect(new URL("/control/status", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/control/:path*"],
};
