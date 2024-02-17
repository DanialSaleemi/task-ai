import Image from "next/image";
import TaskComponents from "@/components/taskcomponents";
import LandingPage from "@/components/landingpage";

/**
 * Renders the Home component.
 *
 * @return {JSX.Element} The main content for the home page.
 */
export default function Home() {
  return (
    
    <main className="min-h-screen bg-gradient-to-r from-white to-blue-100">
        <LandingPage/>
    </main>
    
  );
}
