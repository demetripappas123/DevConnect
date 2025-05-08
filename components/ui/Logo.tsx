'use client'

import React from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

export function Logo() {
  const { user } = useAuth()
  const router = useRouter()

  const handleClick = () => {
    if (user) {
      router.push('/dashboard')
    } else {
      router.push('/')
    }
  }

  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center"
    >
      <span className="text-5xl font-black text-white">
        DevConnect
      </span>
    </button>
  )
} 