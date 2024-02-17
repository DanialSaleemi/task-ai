import React from "react";
import Image from "next/image";

//Continuous sliding Carousel for techstack. Add following custom css in globals.css:
// @keyframes slide {
//   0% {
//     transform: translateX(0);
//   }
//   100% {
//     transform: translateX(-50%);
//   }
// }

// .animate-slide {
//   animation: slide 10s linear infinite;
// }

const Carousel = () => {
  // Tech Stack logos
  const items: string[] = [
    "/neon-logo.png",
    "/axios.svg",
    "/fastapi-logo.png",
    "/sqlmodel.svg",
    "/pythonlogo.png",
    "/Openai_Logo.png",
    "/TailwindCSS-logo.png",
    "/next.svg",
    "/vercel.svg",
  ];
  return (
    <div className="flex items-center min-h-[80px]">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-5">
          <p className="text-center text-xl md:text-2xl lg:text-3xl text-slate-400/70 font-bold tracking-widest">
            Technology Stack
          </p>
        </div>
          <div className="whitespace-nowrap animate-slide flex items-center z-20">
            {items.map((item, index) => (
              <div key={index} className="inline-flex py-2 px-4 min-w-[80px]">
                <Image
                  src={item}
                  alt={`Tech ${index + 1}`}
                  width={100}
                  height={100}
                />
              </div>
            ))}
            {items.map((item, index) => (
              <div
                key={`copy-${index}`}
                className="inline-flex py-2 px-4 min-w-[80px]"
              >
                <Image
                  src={item}
                  alt={`Tech ${index + 1}`}
                  width={100}
                  height={100}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
