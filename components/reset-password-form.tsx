"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { supabase } from "@/lib/supabase-client"

export default function ResetPasswordForm() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [initialized, setInitialized] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if we have the access token in the URL
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession()

      if (error || !data.session) {
        setError("Invalid or expired password reset link. Please try again.")
      }

      setInitialized(true)
    }

    checkSession()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)

    try {
      const { error } = await supabase.auth.updateUser({
        password,
      })

      if (error) {
        throw error
      }

      // Password updated successfully - redirect to dashboard
      router.push("/dashboard")
    } catch (error: any) {
      setError(error.message || "Failed to reset password")
    } finally {
      setLoading(false)
    }
  }

  if (!initialized) {
    return <div>Loading...</div>
  }

  if (error && !loading) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
        <div className="mt-4">
          <a href="/forgot-password" className="font-medium text-sm text-red-600 hover:text-red-500">
            Request a new password reset link
          </a>
        </div>
      </Alert>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="password">New Password</Label>
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
        <Label htmlFor="confirmPassword">Confirm New Password</Label>
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
          {loading ? "Updating password..." : "Update password"}
        </Button>
      </div>
    </form>
  )
}
