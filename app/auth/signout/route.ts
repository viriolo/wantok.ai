import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST() {
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

  await supabase.auth.signOut()

  return NextResponse.redirect(new URL("/login", "https://wantok-ai.vercel.app"), {
    status: 302,
  })
}
