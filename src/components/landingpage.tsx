import React from "react";
import Link from "next/link";
import Image from "next/image";
import TaskComponents from "./taskcomponents";

const LandingPage = async () => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-center space-x-2">
        <div className="flex flex-col items-center gap-6 mt-2">
          <Link
            href={"https://chat.openai.com/g/g-pRFPHnbZb-taskgenius"}
            target="_blank"
            title="Open custom ChatGPT interface for Task Genius"
          >
            <div className="flex items-center justify-center text-sm text-violet-900 text-opacity-60 hover:text-opacity-100 hover:scale-110 transition-transform font-extralight tracking-tighter">
              Access TaskGenius GPT here 👉
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
            </div>
          </Link>
          <h1 className="text-3xl lg:text-6xl font-extrabold text-violet-700 text-opacity-70 tracking-wider">
            Task Genius AI
          </h1>
          <p className="font-extralight text-violet-800">
            Generative Genius: Transform Your Daily activities with GPT-Driven
            Actions!
          </p>
        </div>
      </div>
      <TaskComponents/>
    </div>
  );
};

export default LandingPage;
