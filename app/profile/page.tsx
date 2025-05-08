import { Suspense } from 'react'
import { Post } from '@/components/Post'

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Profile Header */}
        <div className="mb-8">
          <div className="w-24 h-24 rounded-full bg-white/10 mb-4" />
          <h1 className="text-3xl font-bold mb-2">John Doe</h1>
          <p className="text-gray-400">@johndoe</p>
          <p className="mt-4 text-gray-200">
            Full-stack developer passionate about building great user experiences.
          </p>
          <div className="mt-4 flex gap-4">
            <div>
              <span className="font-semibold">123</span>{' '}
              <span className="text-gray-400">Posts</span>
            </div>
            <div>
              <span className="font-semibold">1.2k</span>{' '}
              <span className="text-gray-400">Followers</span>
            </div>
            <div>
              <span className="font-semibold">500</span>{' '}
              <span className="text-gray-400">Following</span>
            </div>
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-4">Posts</h2>
          <Suspense fallback={<div>Loading posts...</div>}>
            {/* TODO: Add posts fetching logic */}
            <Post
              author="John Doe"
              content="Just launched my new project! Check it out at github.com/johndoe/project"
              timestamp="2 hours ago"
            />
            <Post
              author="John Doe"
              content="Looking for collaborators for an open source project. DM if interested!"
              timestamp="5 hours ago"
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
} 