"use client";

import BgImage from "../../public/images/bgimg.jpg";
import Image from "next/image";
import ParticipantsCard from "@/components/participants";

export default function LandingPage({
  isAdmin,
  handleSetUserName,
  placeholderUserName,
}) {
  return (
    <main>
      <div className="container mx-auto flex min-h-screen">
        <div className="flex-1 flex relative z-10">
          <div className="flex flex-col gap-2 max-w-sm lg:max-w-lg flex-1">
            <h1 className="font-bold text-5xl text-primary mt-16">
              Play Your Cards Right with Planning Poker!
            </h1>
            <p className="py-6 text-lg font-semibold">
              {`Elevate your team's project planning with our intuitive Planning
              Poker app. Effortlessly collaborate, estimate tasks, and uncover
              hidden aces in your project deck. Say goodbye to guesswork and
              hello to accurate, fun-filled planning!`}
            </p>

            <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100 border-primary border">
              <div className="card-body flex">
                <ParticipantsCard
                  isAdmin={isAdmin}
                  handleSetUserName={handleSetUserName}
                  placeholderUserName={placeholderUserName}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 items-center flex-col">
          <Image src={BgImage} alt="Scrum planner" className="m-2 relative" />
        </div>
      </div>
    </main>
  );
}
