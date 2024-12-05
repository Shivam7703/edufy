// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Edunify ',
  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-zinc-50">
        <Navigation />
        <main className="container mx-auto px-4 py-8 ">
          {children}
        </main>
        <footer className="bg-gray-800 text-white text-center py-4">
          <p>&copy; 2024 Edunify. Designed by shivamg7703@gmail.com</p>
        </footer>
      </body>
    </html>
  )
}