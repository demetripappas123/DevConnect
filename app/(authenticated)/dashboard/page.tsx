'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import Image from 'next/image'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface Post {
  id: string
  content: string
  media_urls: string[]
  created_at: string
  user_id: string
  user: {
    name: string
    avatar_url: string
  }
  likes_count: number
  comments_count: number
}

export default function DashboardPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) {
      router.push('/')
      return
    }

    fetchPosts()
  }, [user, router])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          user:profiles(name, avatar_url)
        `)
        .order('created_at', { ascending: false })

      if (error) throw error

      setPosts(data || [])
    } catch (err) {
      console.error('Error fetching posts:', err)
      setError('Failed to load posts')
    } finally {
      setLoading(false)
    }
  }

  const handleLike = async (postId: string) => {
    try {
      const { error } = await supabase
        .from('likes')
        .insert({ post_id: postId, user_id: user?.email })

      if (error) throw error

      // Update local state
      setPosts(posts.map(post => 
        post.id === postId 
          ? { ...post, likes_count: post.likes_count + 1 }
          : post
      ))
    } catch (err) {
      console.error('Error liking post:', err)
    }
  }

  if (!user) return null

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {posts.map((post) => (
          <div key={post.id} className="mb-8 bg-white/5 rounded-lg overflow-hidden border border-white/10">
            {/* Post Header */}
            <div className="p-4 flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={post.user.avatar_url || '/assets/images/default-avatar.png'}
                  alt={post.user.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="font-semibold">{post.user.name}</div>
                <div className="text-sm text-gray-400">
                  {new Date(post.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric'
                  })}
                </div>
              </div>
            </div>

            {/* Post Content */}
            <div className="px-4 pb-4">
              <p className="mb-4">{post.content}</p>
              
              {/* Media Grid */}
              {post.media_urls && post.media_urls.length > 0 && (
                <div className={`grid gap-2 mb-4 ${
                  post.media_urls.length === 1 ? 'grid-cols-1' :
                  post.media_urls.length === 2 ? 'grid-cols-2' :
                  'grid-cols-2'
                }`}>
                  {post.media_urls.map((url, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                      {url.endsWith('.mp4') || url.endsWith('.webm') ? (
                        <video
                          src={url}
                          controls
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Image
                          src={url}
                          alt={`Post media ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Post Actions */}
              <div className="flex items-center gap-6">
                <button
                  onClick={() => handleLike(post.id)}
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span>{post.likes_count}</span>
                </button>
                <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>{post.comments_count}</span>
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

        {posts.length === 0 && (
          <div className="text-center text-gray-400 py-8">
            No posts yet. Be the first to share something!
          </div>
        )}
      </div>
    </div>
  )
} 