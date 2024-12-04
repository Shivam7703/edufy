// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Edunify School Management',
  description: 'Manage and view school information',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="bg-gray-800 text-white text-center py-4">
          <p>&copy; 2024 Edunify School Management System</p>
        </footer>
      </body>
    </html>
  )
}