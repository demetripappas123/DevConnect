import { Suspense } from 'react'
import { Post } from '@/components/Post'

export default function FeedPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Feed</h1>
      <div className="grid gap-6">
        <Suspense fallback={<div>Loading posts...</div>}>
          {/* TODO: Add posts fetching logic */}
          <Post
            author="John Doe"
            content="Just launched my new project! Check it out at github.com/johndoe/project"
            timestamp="2 hours ago"
          />
          <Post
            author="Jane Smith"
            content="Looking for collaborators for an open source project. DM if interested!"
            timestamp="5 hours ago"
          />
        </Suspense>
      </div>
    </div>
  )
} 