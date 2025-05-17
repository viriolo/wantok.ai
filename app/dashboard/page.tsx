import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, FileText, Calculator } from "lucide-react"

export default async function DashboardPage() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Welcome to Wantok.ai</h1>
            <p className="mt-1 text-gray-600">Professional services simplified for Papua New Guinea</p>
          </div>
          <div className="mt-4 md:mt-0">
            <form action="/auth/signout" method="post">
              <Button type="submit" variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                Sign out
              </Button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Professional Support</CardTitle>
              <Shield className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Expert guidance from qualified professionals in tax and legal matters
              </div>
              <Button variant="link" className="mt-4 px-0 text-red-600">
                Get Support
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Accurate Calculations</CardTitle>
              <Calculator className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Precise PNG tax calculations following the latest regulations
              </div>
              <Button variant="link" className="mt-4 px-0 text-red-600">
                Calculate Now
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Legal Advice</CardTitle>
              <FileText className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Get timely legal consultations through chat or document review
              </div>
              <Button variant="link" className="mt-4 px-0 text-red-600">
                Get Advice
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Your account details and settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Email:</span> {session.user.email}
                </div>
                <div>
                  <span className="font-medium">Account created:</span>{" "}
                  {new Date(session.user.created_at).toLocaleDateString()}
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                    Edit Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
