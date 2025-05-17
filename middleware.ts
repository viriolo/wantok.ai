import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Check auth condition
  const isAuthRoute =
    req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/register") ||
    req.nextUrl.pathname.startsWith("/forgot-password") ||
    req.nextUrl.pathname.startsWith("/reset-password")

  const isProtectedRoute = req.nextUrl.pathname.startsWith("/dashboard") || req.nextUrl.pathname.startsWith("/profile")

  // If user is signed in and trying to access auth page, redirect them to dashboard
  if (session && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  // If user is not signed in and trying to access a protected route, redirect them to login
  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  return res
}

export const config = {
  matcher: [
    "/login/:path*",
    "/register/:path*",
    "/forgot-password/:path*",
    "/reset-password/:path*",
    "/dashboard/:path*",
    "/profile/:path*",
  ],
}
