import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard | Wantok.ai",
  description: "Professional services simplified for Papua New Guinea",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold">wantok.ai</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a
                href="/dashboard"
                className="text-gray-900 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </a>
              <a
                href="/dashboard/services"
                className="text-gray-500 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Services
              </a>
              <a
                href="/dashboard/reports"
                className="text-gray-500 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Reports
              </a>
              <a
                href="/dashboard/help"
                className="text-gray-500 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Help
              </a>
            </nav>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}
