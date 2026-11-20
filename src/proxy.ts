import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/utils/constants";
import { verifySession } from "@/utils/jwt";

/**
 * First line of defence for the back office: anonymous visitors are sent to
 * the login page. Controllers re-check the session on every request too.
 */
export async function proxy(request: NextRequest) {
  const session = await verifySession(request.cookies.get(SESSION_COOKIE)?.value);
  if (!session) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    url.search = "";
    const response = NextResponse.redirect(url);
    response.cookies.delete(SESSION_COOKIE);
    return response;
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/dashboard/:path*"],
};
