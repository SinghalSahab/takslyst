import React from 'react'
import { Search, Settings } from 'lucide-react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className="flex items-center justify-between bg-[#ffffff] px-4 py-3 shadow-sm dark:bg-[#1f2937]">
      <div className="flex items-center gap-8">
        {/* search bar */}
        <div className="relative flex items-center h-min w-[200px]">
          <Search className="absolute left-[6px] top-1/2 h-4 w-4 -translate-y-1/2 transform cursor-pointer text-[#6b7280] dark:text-[#9ca3af]" />
          <input
            className="w-full rounded-md bg-[#f0f4f8] p-2 pl-8 text-sm text-[#1f2937] placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] dark:bg-[#111827] dark:text-[#e5e7eb] dark:placeholder-[#9ca3af] dark:focus:ring-[#60a5fa]"
            type="search"
            placeholder="Search..."
          />
        </div>
      </div>
      <div className='flex items-center'>
        <Link href="/settings" className="h-min w-min rounded p-2 hover:bg-[#e2e8f0] dark:hover:bg-[#1f2937]">
        <Settings className='h-6 w-6 cursor-pointer dark:text-white' />
        </Link>
        {/* profile icon (placeholder) */}
      </div>
    </div>
  )
}

export default Navbar
