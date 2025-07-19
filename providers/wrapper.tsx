"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full bg-[#f0f4f8] text-[#1f2937] dark:bg-[#111827] dark:text-[#e5e7eb]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <Layout>{children}</Layout>;
};

export default Wrapper;