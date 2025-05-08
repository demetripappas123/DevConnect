'use client'

import { Navigation } from '@/components/Navigation'

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <main className="md:pl-64 pt-16 pb-16 md:pb-0">
        {children}
      </main>
    </div>
  )
} 