// src/app/page.tsx
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">
          School Management System
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Manage and explore school information effortlessly
        </p>
        <div className="flex justify-center space-x-4">
          <Link 
            href="/addSchool" 
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Add New School
          </Link>
          <Link 
            href="/showSchools" 
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            View Schools
          </Link>
        </div>
      </div>
    </div>
  )
}