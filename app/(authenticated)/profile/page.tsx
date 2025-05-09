'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import Image from 'next/image'

interface Post {
  id: number
  content: string
  image?: string
  likes: number
  comments: number
  timestamp: string
}

export default function ProfilePage() {
  const { user } = useAuth()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [bio, setBio] = useState('Full-stack developer passionate about building modern web applications. Currently working on DevConnect!')
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      content: 'Just launched my new project! Check it out and let me know what you think.',
      image: '/assets/images/post1.jpg',
      likes: 42,
      comments: 8,
      timestamp: '2h ago'
    },
    {
      id: 2,
      content: 'Learning about React Server Components and they are amazing!',
      likes: 28,
      comments: 5,
      timestamp: '5h ago'
    },
    {
      id: 3,
      content: 'Working on some new features for DevConnect. Stay tuned!',
      image: '/assets/images/post2.jpg',
      likes: 35,
      comments: 12,
      timestamp: '1d ago'
    }
  ])

  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [user, router])

  if (!user) {
    return null
  }

  const handleEditProfile = () => {
    setIsEditing(true)
  }

  const handleSaveProfile = () => {
    setIsEditing(false)
    // Here you would typically save the changes to your backend
  }

  const handleShareProfile = () => {
    // Here you would implement the share functionality
    navigator.clipboard.writeText(window.location.href)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Profile Header */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-start gap-8">
          {/* Profile Picture */}
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-white/10">
            <Image
              src="/assets/images/avatar.jpg"
              alt="Profile picture"
              fill
              className="object-cover"
            />
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-2xl font-bold">{user.name || 'John Doe'}</h1>
              <div className="flex gap-2">
                <button
                  onClick={handleEditProfile}
                  className="px-4 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                >
                  Edit Profile
                </button>
                <button
                  onClick={handleShareProfile}
                  className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-6 mb-4">
              <div>
                <span className="font-semibold">{posts.length}</span> posts
              </div>
              <div>
                <span className="font-semibold">1.2k</span> followers
              </div>
              <div>
                <span className="font-semibold">450</span> following
              </div>
            </div>

            {/* Bio */}
            <div className="mb-4">
              {isEditing ? (
                <div className="space-y-2">
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white placeholder-gray-400 focus:outline-none focus:border-white/20"
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveProfile}
                      className="px-4 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-300">{bio}</p>
              )}
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-6">Posts</h2>
          <div className="grid grid-cols-1 gap-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-white/5 rounded-lg overflow-hidden border border-white/10">
                {/* Post Header */}
                <div className="p-4 flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src="/assets/images/avatar.jpg"
                      alt="Profile picture"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold">{user.name || 'John Doe'}</div>
                    <div className="text-sm text-gray-400">{post.timestamp}</div>
                  </div>
                </div>

                {/* Post Content */}
                <div className="px-4 pb-4">
                  <p className="mb-4">{post.content}</p>
                  {post.image && (
                    <div className="relative w-full aspect-video mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={post.image}
                        alt="Post image"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  {/* Post Actions */}
                  <div className="flex items-center gap-6">
                    <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span>{post.comments}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 