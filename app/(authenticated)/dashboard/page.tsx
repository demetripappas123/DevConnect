'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface Post {
  id: string
  author: {
    name: string
    avatar: string
  }
  content: string
  image?: string
  likes: number
  comments: number
  timestamp: string
}

const mockPosts: Post[] = [
  {
    id: '1',
    author: {
      name: 'Sarah Chen',
      avatar: '/assets/images/img1.png'
    },
    content: 'Just deployed my first Next.js application! 🚀 The development experience was amazing, and I learned so much about React Server Components.',
    image: '/assets/images/img2.png',
    likes: 42,
    comments: 8,
    timestamp: '2h ago'
  },
  {
    id: '2',
    author: {
      name: 'Alex Rivera',
      avatar: '/assets/images/img2.png'
    },
    content: 'Working on a new TypeScript project. The type safety is giving me so much confidence in my code! 💪',
    likes: 28,
    comments: 5,
    timestamp: '4h ago'
  },
  {
    id: '3',
    author: {
      name: 'Emma Wilson',
      avatar: '/assets/images/img3.png'
    },
    content: 'Just finished implementing authentication in my app. JWT + Next.js makes it so straightforward! 🔐',
    likes: 35,
    comments: 12,
    timestamp: '6h ago'
  }
]

export default function Dashboard() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const [posts, setPosts] = useState<Post[]>(mockPosts)

  const handleLogout = async () => {
    try {
      await signOut()
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ))
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Main Content */}
      <main className="w-full md:max-w-2xl mx-auto py-8 px-4">
        <div className="space-y-8">
          {posts.map(post => (
            <article key={post.id} className="bg-black border border-white/10 rounded-xl overflow-hidden">
              {/* Post Header */}
              <div className="p-4 flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-white">{post.author.name}</h3>
                  <p className="text-sm text-gray-400">{post.timestamp}</p>
                </div>
              </div>

              {/* Post Content */}
              <div className="px-4 pb-4">
                <p className="text-white mb-4">{post.content}</p>
                {post.image && (
                  <div className="relative aspect-[4/3] mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={post.image}
                      alt="Post image"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Post Actions */}
              <div className="px-4 py-3 border-t border-white/10 flex items-center gap-6">
                <button
                  onClick={() => handleLike(post.id)}
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>{post.comments}</span>
                </button>
                <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  <span>Share</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  )
} 