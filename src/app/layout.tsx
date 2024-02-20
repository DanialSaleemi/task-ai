import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import Carousel from "@/components/stackcarousel";

// const inter = Inter({ subsets: ["latin"] });
// const roboto = Roboto_Serif({ subsets: ['latin'] })
const mat = Josefin_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TaskGenius AI - Elevate Your Productivity",
  description: `Discover TaskGenius AI, the revolutionary tool designed
                to transform your workflow. With our advanced GPT powered AI, 
                managing tasks has never been easier or more efficient. 
                From creating detailed task lists to automating CRUD operations 
                with unparalleled precision, TaskGenius AI is your all-in-one 
                solution for task management. Experience seamless integration, 
                real-time updates, and a user-friendly interface that empowers 
                you to focus on what truly matters. 
                Join us and unlock the full potential of your productivity.`,

  keywords: `TaskGenius AI, AI task management, productivity tool, automate tasks, efficient workflow, CRUD operations, real-time updates, user-friendly interface, advanced AI, CustomGPT, LLM, task automation.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={mat.className}>
        <div className="min-h-screen bg-gradient-to-r px-2 from-white to-blue-100">
          <Carousel/>
          {children}

        </div>
      </body>
    </html>
  );
}
