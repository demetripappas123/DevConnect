import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verify } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function GET() {
  try {
    const token = cookies().get('token')?.value

    if (!token) {
      return NextResponse.json({ user: null })
    }

    const decoded = verify(token, JWT_SECRET) as { email: string }
    return NextResponse.json({ user: { email: decoded.email } })
  } catch (error) {
    console.error('Session check error:', error)
    return NextResponse.json({ user: null })
  }
} 