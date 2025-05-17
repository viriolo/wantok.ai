import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

export const metadata: Metadata = {
  title: "Email Confirmation | Wantok.ai",
  description: "Confirm your email address",
}

export default function ConfirmationPage({
  searchParams,
}: {
  searchParams: { email?: string }
}) {
  const email = searchParams.email || "your email"

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <h1 className="text-4xl font-bold text-center">wantok.ai</h1>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Check your email</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <CardHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <Mail className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle className="text-center mt-4">Confirmation email sent</CardTitle>
            <CardDescription className="text-center">
              We've sent a confirmation email to <strong>{email}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-gray-500 mb-6">
              Please check your email and click on the confirmation link to complete your registration.
            </p>
            <div className="flex flex-col space-y-4">
              <Button asChild variant="outline">
                <a href="/login">Back to login</a>
              </Button>
              <Button asChild variant="link" className="text-red-600">
                <a href="/register">Use a different email</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
