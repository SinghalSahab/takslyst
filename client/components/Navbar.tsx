import React from "react";
import { Menu, Moon, Search, Settings, Sun } from "lucide-react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode, setIsSidebarCollapsed } from "@/state";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  return (
    <div className="flex items-center justify-between bg-black px-4 py-3 shadow border-b border-zinc-800">
      <div className="flex items-center gap-8">
        {!isSidebarCollapsed ? null : (
          <button
            aria-label="Toggle sidebar"
            onClick={() =>
              dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))
            }
            className="rounded-md p-1 hover:bg-zinc-800 transition"
          >
            <Menu className="h-7 w-7 text-zinc-200" />
          </button>
        )}

        <div className="relative flex h-min w-[200px] items-center">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            className="w-full rounded-md bg-zinc-800 p-2 pl-8 text-sm
                       text-zinc-200 placeholder-zinc-500
                       focus:outline-none focus:ring-2 focus:ring-zinc-600"
            type="search"
            placeholder="Search..."
          />
        </div>
      </div>

      <div className="flex items-center">
        <button
          onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
          className="rounded-md p-2 hover:bg-zinc-800 transition"
        >
          {isDarkMode ? (
            <Sun className="h-5 w-5 text-zinc-200" />
          ) : (
            <Moon className="h-5 w-5 text-zinc-200" />
          )}
        </button>

        <Link
          href="/settings"
          className="h-min w-min rounded-md p-2 hover:bg-zinc-800 transition"
        >
          <Settings className="h-5 w-5 text-zinc-200" />
        </Link>

        <div className="ml-2 mr-5 hidden min-h-[2em] w-px bg-zinc-700 md:inline-block" />
      </div>
    </div>
  );
};

export default Navbar;
