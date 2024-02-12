import Image from "next/image";
import TaskComponents from "@/components/taskcomponents";

export default function Home() {
  return (
    
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-r from-white to-blue-100">
        <TaskComponents />
    </main>
    
  );
}
