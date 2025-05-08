'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HomeIcon, MagnifyingGlassIcon, PlusCircleIcon, VideoCameraIcon, UserIcon } from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Explore', href: '/explore', icon: MagnifyingGlassIcon },
  { name: 'Create', href: '/create', icon: PlusCircleIcon },
  { name: 'Watch', href: '/watch', icon: VideoCameraIcon },
  { name: 'Profile', href: '/profile', icon: UserIcon },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex flex-col items-center justify-center w-full h-full',
                  isActive ? 'text-primary-600' : 'text-gray-500 hover:text-gray-900'
                )}
              >
                <item.icon className="h-6 w-6" />
                <span className="text-xs mt-1">{item.name}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
} 