interface PostProps {
  author: string
  content: string
  timestamp: string
}

export function Post({ author, content, timestamp }: PostProps) {
  return (
    <article className="bg-white/5 rounded-lg p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-10 h-10 rounded-full bg-white/10" />
        <div>
          <h3 className="font-semibold">{author}</h3>
          <p className="text-sm text-gray-400">{timestamp}</p>
        </div>
      </div>
      <p className="text-gray-200">{content}</p>
      <div className="mt-4 flex items-center gap-4">
        <button className="text-gray-400 hover:text-white transition-colors">
          Like
        </button>
        <button className="text-gray-400 hover:text-white transition-colors">
          Comment
        </button>
        <button className="text-gray-400 hover:text-white transition-colors">
          Share
        </button>
      </div>
    </article>
  )
} 