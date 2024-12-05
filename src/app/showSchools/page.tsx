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
    <div className='min-h-[calc(100vh-186px)] w-full -px-14'>
      <h1 className="text-3xl font-bold text-center mb-8 text-black">
        School's List
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7">
        {schools.map((school) => (
          <div 
            key={school.id} 
            className="border rounded-lg overflow-hidden shadow-lg group hover:border-green-500"
          >
            <div className="relative h-64 w-full overflow-hidden">
              {school.image ? (
                <Image 
                  src={school.image} // Correctly dynamic URL
                  alt={school.name}
                  fill
                  className="object-cover group-hover:scale-110 duration-300"
                />
              ) : (
                <div className="h-full w-full bg-gray-200 flex items-center justify-center ">
                  No Image
                </div>
              )}
            </div>
            <div className=" p-4">
              <div className='text-center'>⭐ ⭐ ⭐ ⭐ ⭐</div>
              <p className='my-2 text-sm text-center text-blue-700'>{school.city}, {school.state}</p>
              <h2 className="text-xl font-medium  text-black">
                {school.name}
              </h2>
              <p className="text-gray-500">{school.address}</p>
              <div className='bg-green-600 rounded-md text-white group-hover:bg-black duration-200 mt-2 p-2 text-sm text-center'>Apply Now</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
