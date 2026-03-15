import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    // Only run on routes that need auth — public game pages don't need session refresh
    "/admin/:path*",
    "/preview/:path*",
  ],
};
