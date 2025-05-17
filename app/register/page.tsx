import type { Metadata } from "next"
import RegisterForm from "@/components/register-form"

export const metadata: Metadata = {
  title: "Register | Wantok.ai",
  description: "Create a new account - Professional services simplified for Papua New Guinea",
}

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <h1 className="text-4xl font-bold text-center">wantok.ai</h1>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Create a new account</h2>
        <p className="mt-2 text-center text-sm text-gray-600">Professional services simplified for Papua New Guinea</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <RegisterForm />
        </div>
      </div>
    </div>
  )
}
