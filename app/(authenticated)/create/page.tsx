'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import Image from 'next/image'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type CreateType = 'post' | 'video'

export default function CreatePage() {
  const { user } = useAuth()
  const router = useRouter()
  const [createType, setCreateType] = useState<CreateType>('post')
  const [content, setContent] = useState('')
  const [mediaFiles, setMediaFiles] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [isRecording, setIsRecording] = useState(false)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([])

  if (!user) {
    router.push('/')
    return null
  }

  const handleMediaSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setMediaFiles(prev => [...prev, ...files])
    
    // Create preview URLs
    const newPreviewUrls = files.map(file => URL.createObjectURL(file))
    setPreviewUrls(prev => [...prev, ...newPreviewUrls])
  }

  const handleStartCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      setIsCameraActive(true)
    } catch (error) {
      console.error('Error accessing camera:', error)
      setError('Failed to access camera')
    }
  }

  const handleStartRecording = () => {
    if (!videoRef.current?.srcObject) return

    const mediaRecorder = new MediaRecorder(videoRef.current.srcObject as MediaStream)
    mediaRecorderRef.current = mediaRecorder
    setRecordedChunks([])

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setRecordedChunks(prev => [...prev, event.data])
      }
    }

    mediaRecorder.start()
    setIsRecording(true)
  }

  const handleStopRecording = () => {
    if (!mediaRecorderRef.current) return

    mediaRecorderRef.current.stop()
    setIsRecording(false)
    setIsCameraActive(false)

    // Create video preview
    const blob = new Blob(recordedChunks, { type: 'video/webm' })
    const url = URL.createObjectURL(blob)
    setPreviewUrls([url])
    setMediaFiles([new File([blob], 'recorded-video.webm', { type: 'video/webm' })])
  }

  const uploadMedia = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `${user.email}/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(filePath, file)

    if (uploadError) {
      throw uploadError
    }

    const { data: { publicUrl } } = supabase.storage
      .from('media')
      .getPublicUrl(filePath)

    return publicUrl
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim() && mediaFiles.length === 0) {
      setError('Please add some content or media')
      return
    }

    try {
      setIsSubmitting(true)
      setError(null)

      // Upload all media files
      const mediaUrls = await Promise.all(
        mediaFiles.map(file => uploadMedia(file))
      )

      // Create post in database
      const { error: postError } = await supabase
        .from('posts')
        .insert({
          content: content.trim(),
          media_urls: mediaUrls,
          user_id: user.email
        })

      if (postError) throw postError

      // Redirect to dashboard
      router.push('/dashboard')
    } catch (err) {
      console.error('Error creating post:', err)
      setError('Failed to create post')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Create New {createType === 'post' ? 'Post' : 'Video'}</h1>

        {/* Type Selection */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setCreateType('post')}
            className={`flex-1 py-3 rounded-lg transition-colors ${
              createType === 'post' ? 'bg-white/20' : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            Post
          </button>
          <button
            onClick={() => setCreateType('video')}
            className={`flex-1 py-3 rounded-lg transition-colors ${
              createType === 'video' ? 'bg-white/20' : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            Video
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Content Input */}
          <div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={`What's on your mind?`}
              className="w-full h-32 bg-white/5 border border-white/10 rounded-lg p-4 text-white placeholder-gray-400 focus:outline-none focus:border-white/20"
            />
          </div>

          {/* Media Preview */}
          {previewUrls.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {previewUrls.map((url, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                  {url.startsWith('blob:video') ? (
                    <video src={url} controls className="w-full h-full object-cover" />
                  ) : (
                    <Image
                      src={url}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewUrls(prev => prev.filter((_, i) => i !== index))
                      setMediaFiles(prev => prev.filter((_, i) => i !== index))
                    }}
                    className="absolute top-2 right-2 p-1 bg-black/50 rounded-full hover:bg-black/70"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Camera Preview */}
          {isCameraActive && (
            <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              {isRecording && (
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-sm">Recording...</span>
                </div>
              )}
            </div>
          )}

          {/* Media Controls */}
          <div className="flex gap-4">
            <label className="flex-1">
              <input
                type="file"
                accept={createType === 'post' ? 'image/*' : 'video/*'}
                multiple={createType === 'post'}
                onChange={handleMediaSelect}
                className="hidden"
              />
              <div className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-lg text-center cursor-pointer transition-colors">
                {createType === 'post' ? 'Add Images' : 'Upload Video'}
              </div>
            </label>

            {createType === 'video' && (
              <>
                {!isCameraActive ? (
                  <button
                    type="button"
                    onClick={handleStartCamera}
                    className="flex-1 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    Open Camera
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={isRecording ? handleStopRecording : handleStartRecording}
                    className={`flex-1 py-3 rounded-lg transition-colors ${
                      isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    {isRecording ? 'Stop Recording' : 'Start Recording'}
                  </button>
                )}
              </>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-center">{error}</div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-lg transition-colors ${
              isSubmitting 
                ? 'bg-blue-500/50 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {isSubmitting ? 'Creating...' : `Create ${createType === 'post' ? 'Post' : 'Video'}`}
          </button>
        </form>
      </div>
    </div>
  )
} 