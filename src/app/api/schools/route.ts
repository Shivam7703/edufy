// src/app/api/schools/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import pool from '@/lib/db'
import { School } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    // Extract form fields
    const name = formData.get('name') as string
    const address = formData.get('address') as string
    const city = formData.get('city') as string
    const state = formData.get('state') as string
    const contact = formData.get('contact') as string
    const email_id = formData.get('email_id') as string
    const imageFile = formData.get('image') as File

    // Handle image upload
    let imagePath = ''
    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer()
      const buffer = Buffer.from(bytes)
      
      const filename = `${Date.now()}_${imageFile.name}`
      const path = join(process.cwd(), 'public/schoolImages', filename)
      
      await writeFile(path, buffer)
      imagePath = `/schoolImages/${filename}`
    }

    // Insert school data
    const [result] = await pool.execute(
      'INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, address, city, state, contact, email_id, imagePath]
    )

    return NextResponse.json({ 
      message: 'School added successfully',
      id: (result as any).insertId 
    }, { status: 200 })

  } catch (error) {
    console.error('School creation error:', error)
    return NextResponse.json({ 
      message: 'Failed to add school',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function GET() {
  try {
    const [schools] = await pool.execute('SELECT * FROM schools')
    return NextResponse.json(schools, { status: 200 })
  } catch (error) {
    console.error('School fetch error:', error)
    return NextResponse.json({ 
      message: 'Failed to fetch schools',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}