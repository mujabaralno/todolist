"use client"

import { navLinks } from '@/constants'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="flex size-full flex-col gap-4">
        <Link href="/" className="sidebar-logo">
        <h1 className="h1-semibold">TODO</h1>
        </Link>

        <nav className="sidebar-nav">
            <ul className="sidebar-nav_elements">
              {navLinks.map((link) => {
                const isActive = link.route === pathname

                return (
                  <li key={link.route} className={`sidebar-nav_element group ${
                    isActive ? 'bg-purple-gradient text-white' : 'text-gray-700'
                  }`}>
                    <Link className="sidebar-link" href={link.route}>
                      <Image 
                        src={isActive ? link.hover : link.icon}
                        alt="logo"
                        width={24}
                        height={24}
                        className={`${isActive && 'brightness-200'}`}
                      />
                      {link.label}
                    </Link>
                  </li>
                )
              })}
              </ul>

        </nav>
      </div>
    </aside>
  )
}

export default Sidebar