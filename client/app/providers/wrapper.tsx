"use client";

import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import StoreProvider, { useAppSelector } from "../redux";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });
  return (
    <div className="flex min-h-screen w-full bg-[#f1f2f4] text-[#2c2f33] dark:bg-[#0f1113] dark:text-[#d1d5db]">
    <Sidebar />
    <main
      className={`flex w-full flex-col bg-[#f1f2f4] dark:bg-[#0f1113] ${
        isSidebarCollapsed ? "" : "md:pl-64"
      }`}
    >
      <Navbar />
      {children}
    </main>
  </div>
  

  );
};

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <Layout>{children}</Layout>
   </StoreProvider>
  )
};

export default Wrapper;