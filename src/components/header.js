"use client";

import Image from "next/image";
import Logo from "../public/images/logo.png";

export default function GlobalHeader({userName, handleResetName}) {

  const getInitials = (userName) => {
    return userName
      .match(/(\b\S)?/g)
      .join("")
      .toUpperCase();
  };
  return (
    <header className="p-2 relative z-30">
      <div className="container mx-auto flex gap-2 justify-between">
        <div className="flex gap-2 items-center cursor-pointer" onClick={handleResetName}>
          <Image
            src={Logo}
            height={50}
            width={50}
            alt="Scrum planner"
            className="m-2"
          />
          <span className="font-bold">Scrum Planner</span>
        </div>
        {userName && (
          <div className="avatar placeholder flex items-center">
            <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
              <span>{getInitials(userName)}</span>
            </div>
            <span className="text-neutral-focus m-2">{userName}</span>
          </div>
        )}
      </div>
    </header>
  );
}
