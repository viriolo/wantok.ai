"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { supabase } from "@/lib/supabase-client"

export default function RegisterForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)

    try {
      // Sign up the user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          // This data will be stored in the user's metadata
          data: {
            full_name: "",
            avatar_url: "",
          },
          // Specify the correct redirect URL for confirmation emails
          emailRedirectTo: "https://wantok-ai.vercel.app/auth/callback",
        },
      })

      if (error) {
        throw error
      }

      if (data.user) {
        // If email confirmation is required, show a message
        if (data.user.identities && data.user.identities.length === 0) {
          setError("A user with this email already exists.")
          setLoading(false)
          return
        }

        // Check if email confirmation is required
        if (!data.session) {
          // Show a message that email confirmation is required
          router.push("/register/confirmation?email=" + encodeURIComponent(email))
          return
        }

        // If email confirmation is not required or already confirmed
        // Redirect to dashboard
        router.push("/dashboard")
        router.refresh()
      }
    } catch (error: any) {
      setError(error.message || "Failed to register")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div>
        <Label htmlFor="email">Email address</Label>
        <div className="mt-1">
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <div className="mt-1">
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="mt-1">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>

      <div>
        <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={loading}>
          {loading ? "Creating account..." : "Create account"}
        </Button>
      </div>
    </form>
  )
}
