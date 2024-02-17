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
    "/axios.svg",
    "/neon.svg",
    "/python-logo-generic.svg",
    "/fastapi.svg",
    "/sqlmodel.svg",
    "/openai-lockup.svg",
    "/tailwindcss-logotype.svg",
    "/next.svg",
    "/vercel.svg",
  ];
  return (
    <div className="flex items-center min-h-[80px]">
      <div className="relative overflow-hidden">
        <div className="absolute py-6 inset-0 z-5 items-center">
          <p className="text-center items-text-xl md:text-2xl lg:text-3xl text-slate-400/70 font-bold tracking-widest">
            Technology Stack
          </p>
        </div>
          <div className="whitespace-nowrap animate-slide flex items-center z-20">
            {items.map((item, index) => (
              <div key={index} className="inline-flex py-2 px-4 min-h-[80px] min-w-[80px]">
                <Image
                  src={item}
                  alt={`Tech ${index + 1}`}
                  width={200}
                  height={200}
                />
              </div>
            ))}
            {items.map((item, index) => (
              <div
                key={`copy-${index}`}
                className="inline-flex py-2 px-4 min-h-[80px] min-w-[80px]"
              >
                <Image
                  src={item}
                  alt={`Tech ${index + 1}`}
                  width={200}
                  height={200}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
