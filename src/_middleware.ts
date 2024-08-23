// pages/_middleware.ts
import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/client";

export async function middleware(req: any) {
  // Get the session from Supabase
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  // If there's an error or no session, redirect to login page
  if (error || !session?.user) {
    // Allow public paths like `/login` or `/signup` to be accessed without authentication
    if (
      req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/signup")
    ) {
      return NextResponse.next();
    }

    // Redirect to login page if user is not authenticated
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Continue if session is valid
  return NextResponse.next();
}
