import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Wrapper from "@/app/dashboardWrapper";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "tasklyst",
  keywords: ["tasklyst", "tasks", "productivity"],
  authors: [{ name: "Prakhar Singhal"}],
  description: "A task management app to help you stay organized and productive.",
  creator: "Prakhar Singhal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  );
}