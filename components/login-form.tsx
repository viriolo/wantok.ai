"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { supabase } from "@/lib/supabase-client"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw error
      }

      if (data.user) {
        router.push("/dashboard")
        router.refresh()
      }
    } catch (error: any) {
      setError(error.message || "Failed to sign in")
    } finally {
      setLoading(false)
    }
  }

  const handleMagicLinkLogin = async () => {
    setError(null)
    setSuccess(null)
    setLoading(true)

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: "https://wantok-ai.vercel.app/auth/callback",
        },
      })

      if (error) {
        throw error
      }

      setSuccess("Check your email for the login link!")
    } catch (error: any) {
      setError(error.message || "Failed to send magic link")
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

      {success && (
        <Alert>
          <AlertDescription>{success}</AlertDescription>
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
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <a href="/forgot-password" className="font-medium text-sm text-red-600 hover:text-red-500">
            Forgot your password?
          </a>
        </div>
      </div>

      <div className="space-y-2">
        <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full border-red-600 text-red-600 hover:bg-red-50"
          onClick={handleMagicLinkLogin}
          disabled={loading || !email}
        >
          Sign in with Magic Link
        </Button>
      </div>

      <div className="mt-6 text-center">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Don't have an account?</span>
          </div>
        </div>
        <div className="mt-6">
          <a href="/register">
            <Button type="button" variant="outline" className="w-full">
              Sign up
            </Button>
          </a>
        </div>
      </div>
    </form>
  )
}
