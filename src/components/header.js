"use client";

import { useState } from "react";
import Image from "next/image";
import Logo from "../public/images/logo.png";

export default function GlobalHeader({
  room,
  userName,
  handleOpenLandingPage,
}) {
  const [showToast, setShowToast] = useState(false);
  const getInitials = (userName) => {
    return userName
      .match(/(\b\S)?/g)
      .join("")
      .toUpperCase();
  };
  const copyUrlToClipboard = async () => {
    const joinRoomLink = `${window.location.host}/?room=${room}`;
    await navigator.clipboard.writeText(joinRoomLink);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 1 * 1000);
  };
  return (
    <header className="p-2 relative z-30 bg-base-100">
      <div className="container mx-auto flex gap-2 justify-between">
        <div
          className="flex gap-1 items-center cursor-pointer"
          onClick={handleOpenLandingPage}
        >
          <Image
            src={Logo}
            height={50}
            width={50}
            alt="Scrum planner"
            className="m-2"
          />
          <span className="font-black text-3xl">Scrum Planner</span>
        </div>
        {userName && (
          <div className="flex gap-2 items-center">
            <div>
              <button
                onClick={copyUrlToClipboard}
                className="btn btn-outline btn-primary normal-case rounded-full tracking-wider"
              >
                Invite Colleagues
              </button>
              {showToast ? (
                <div className="toast toast-top toast-end mt-20">
                  <div className="alert alert-success bg-green-500 text-gray-900">
                    <span>Link Copied</span>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="avatar placeholder flex items-center">
              <span className="text-neutral-focus m-2">{userName}</span>
              <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                <span>{getInitials(userName)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
