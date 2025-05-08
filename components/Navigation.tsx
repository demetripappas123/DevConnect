'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { HomeIcon, SearchIcon, PlusIcon, WatchIcon, ProfileIcon, HeartIcon, MessageIcon } from './icons'
import { Logo } from './ui/Logo'
import { useAuth } from '@/contexts/AuthContext'

const navigation = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  { name: 'Search', href: '/search', icon: SearchIcon },
  { name: 'Create', href: '/create', icon: PlusIcon },
  { name: 'Watch', href: '/watch', icon: WatchIcon },
  { name: 'Profile', href: '/profile', icon: ProfileIcon },
]

export function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, signOut } = useAuth()

  if (!user) {
    return null
  }

  const handleLogout = async () => {
    try {
      await signOut()
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <>
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-black border-b border-white/10 z-50">
        <div className="h-full flex items-center justify-between px-4">
          <div>
            <Logo />
          </div>
          <div className="flex items-center space-x-8">
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <HeartIcon />
            </button>
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <MessageIcon />
            </button>
            <button 
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar Navigation */}
      <nav className="fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-black border-r border-white/10 hidden md:block">
        <div className="p-4">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <item.icon />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-black border-t border-white/10 md:hidden z-50">
        <div className="h-full flex items-center justify-around">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`p-2 transition-colors ${
                  isActive
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <item.icon />
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
} 