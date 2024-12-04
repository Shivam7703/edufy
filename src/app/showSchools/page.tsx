// src/app/showSchools/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { School } from '@/types'

export default function ShowSchools() {
  const [schools, setSchools] = useState<School[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchSchools() {
      try {
        const response = await fetch('/api/schools')
        if (!response.ok) {
          throw new Error('Failed to fetch schools')
        }
        const data: School[] = await response.json()
        setSchools(data)
        setLoading(false)
      } catch (err) {
        setError('Failed to load schools')
        setLoading(false)
        console.error(err)
      }
    }

    fetchSchools()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-500 text-xl">
        {error}
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-8">
        School Directory
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {schools.map((school) => (
          <div 
            key={school.id} 
            className="border rounded-lg overflow-hidden shadow-lg"
          >
            <div className="relative h-64 w-full">
              {school.image ? (
                <Image 
                  src={school.image} 
                  alt={school.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                  No Image
                </div>
              )}
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">
                {school.image}
              </h2>
              <p className="text-gray-600">{school.address}</p>
              <p className="text-gray-600">
                {school.city}, {school.state}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}