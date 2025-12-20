import React from 'react'
import { Menu, Moon, Search, Settings, Sun } from 'lucide-react'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/app/redux';
import { setIsDarkMode, setIsSidebarCollapsed } from '@/state';

const Navbar = () => {
    const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  return (
    <div className="flex items-center justify-between bg-[#f9fafb] px-4 py-3 shadow-sm dark:bg-[#1c1c1e]">
    <div className="flex items-center gap-8">
      
      {!isSidebarCollapsed ? null : (
          <button
            aria-label="Toggle sidebar"
            onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}
          >
            <Menu className="h-8 w-8 dark:text-white" />
          </button>
        )}
      <div className="relative flex items-center h-min w-[200px]">
        <Search className="absolute left-[6px] top-1/2 h-4 w-4 -translate-y-1/2 transform cursor-pointer text-[#555] dark:text-[#aaa]" />
        <input
          className="w-full rounded-md bg-[#eeeeee] p-2 pl-8 text-sm text-[#1c1c1e] placeholder-[#777] focus:outline-none focus:ring-2 focus:ring-[#6e6e6e] dark:bg-[#2a2a2c] dark:text-[#e5e5e5] dark:placeholder-[#888] dark:focus:ring-[#777]"
          type="search"
          placeholder="Search..."
        />
      </div>
    </div>
  
    <div className="flex items-center">
    <button
          onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
          className={
            isDarkMode
              ? `rounded p-2 dark:hover:bg-gray-700`
              : `rounded p-2 hover:bg-gray-100`
          }
        >
          {isDarkMode ? (
            <Sun className="h-6 w-6 cursor-pointer dark:text-white" />
          ) : (
            <Moon className="h-6 w-6 cursor-pointer dark:text-white" />
          )}
        </button>
        <Link
          href="/settings"
          className={
            isDarkMode
              ? `h-min w-min rounded p-2 dark:hover:bg-gray-700`
              : `h-min w-min rounded p-2 hover:bg-gray-100`
          }
        >
        <Settings className="h-6 w-6 cursor-pointer text-[#333] dark:text-[#d1d1d1]" />
      </Link>
      <div className="ml-2 mr-5 hidden min-h-[2em] w-[0.1rem] bg-[#d3d4d6] dark:bg-[#2a2c2e] md:inline-block"></div>

    </div>
  </div>
  
  )
}

export default Navbar
