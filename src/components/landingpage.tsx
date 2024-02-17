import React from "react";
import Carousel from "./stackcarousel";
import TaskComponents from "./taskcomponents";
import Link from "next/link";
import Image from "next/image";

const LandingPage = () => {
  return (
    <div className="space-y-2">
      <div title="Technology stack used to build this application">
        <Carousel />
      </div>
      <div className="flex items-center justify-center space-x-2">
        <Link
          href={"https://chat.openai.com/g/g-pRFPHnbZb-taskgenius"}
          target="_blank"
          title="Open custom ChatGPT interface for Task Genius"
        >
          <div className="flex flex-col items-center gap-6 mt-2">
            <Image
              src="/logo.png"
              alt="logo"
              loading="lazy"
              style={{
                width: "15%",
                height: "auto",
              }}
              width={75}
              height={75}
            />
            <h1 className="text-3xl lg:text-6xl font-extrabold text-[#3e2890] text-opacity-70 tracking-wider">
              Task Genius AI
            </h1>
            <p className="font-extralight text-violet-800">
              Generative Genius: Transform Your Daily activities with AI-Driven
              Action!
            </p>
          </div>
        </Link>
      </div>
      <TaskComponents />
    </div>
  );
};

export default LandingPage;
