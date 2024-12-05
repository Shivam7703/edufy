// src/components/Navigation.tsx
import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="bg-blue-600 text-white">
      <div className="container mx-auto flex flex-wrap gap-y-3 justify-between items-center p-4">
        <Link href="/" className="text-2xl font-bold">
          Edunify
        </Link>
        <div className="space-x-4">
          <Link 
            href="/addSchool" 
            className="hover:bg-blue-700 px-3 py-2 rounded"
          >
            Add School
          </Link>
          <Link 
            href="/showSchools" 
            className="hover:bg-blue-700 px-3 py-2 rounded"
          >
            View Schools
          </Link>
        </div>
      </div>
    </nav>
  )
}