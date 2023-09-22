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
    <main className="mx-8">
      <div className="container mx-auto flex p-5 md:p-0 lg:p-0 items-center">
        <div className="flex-1 flex relative z-10">
          <div className="flex flex-col gap-2 max-w-sm lg:max-w-lg flex-1">
            <h1 className="font-bold text-5xl text-primary mt-12 mb-6">
              Play Your Cards Right with Planning Poker!
            </h1>
            <p className="hidden md:block py-6 text-lg">
              {`Elevate your team's project planning with our intuitive Planning
              Poker app. Effortlessly collaborate, estimate tasks, and uncover
              hidden aces in your project deck. Say goodbye to guesswork and
              hello to accurate, fun-filled planning!`}
            </p>
            <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100 shadow-teal-300/50 border-primary border">
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
        <div className="flex-1 items-center md:flex-col hidden md:block lg:block">
          <Image
            height={600}
            src={BgImage}
            alt="Scrum planner"
            className="m-2 relative mix-blend-darken"
          />
        </div>
      </div>
    </main>
  );
}
