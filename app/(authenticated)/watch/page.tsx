'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export default function WatchPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)

  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [user, router])

  if (!user) {
    return null
  }

  // Placeholder for video data
  const videos = [
    { id: 1, author: 'Sarah Chen', description: 'Building a Next.js app with TypeScript' },
    { id: 2, author: 'Alex Rivera', description: 'React Server Components deep dive' },
    { id: 3, author: 'Emma Wilson', description: 'Advanced TypeScript patterns' },
  ]

  const handleNext = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length)
  }

  const handlePrevious = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Video Container */}
      <div className="relative h-[calc(100vh-4rem)] overflow-hidden">
        {/* Current Video */}
        <div className="absolute inset-0 bg-white/5 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mb-4 mx-auto">
              <svg className="w-full h-full text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-gray-400">Video will be displayed here</p>
          </div>
        </div>

        {/* Video Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
          <div className="max-w-2xl">
            <h2 className="text-xl font-semibold mb-2">{videos[currentVideoIndex].author}</h2>
            <p className="text-gray-300">{videos[currentVideoIndex].description}</p>
          </div>
        </div>

        {/* Navigation Controls - Top and Bottom */}
        <div className="absolute inset-x-0 top-0 h-1/2 flex items-start justify-center pt-4">
          <button
            onClick={handlePrevious}
            className="p-2 text-white/50 hover:text-white transition-colors"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1/2 flex items-end justify-center pb-4">
          <button
            onClick={handleNext}
            className="p-2 text-white/50 hover:text-white transition-colors"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-6">
          <button className="p-2 text-white/50 hover:text-white transition-colors">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <button className="p-2 text-white/50 hover:text-white transition-colors">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
          <button className="p-2 text-white/50 hover:text-white transition-colors">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
} 