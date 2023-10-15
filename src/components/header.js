"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "../public/images/logo.png";
import { FaUserEdit } from "react-icons/fa";

export default function GlobalHeader({
  userName,
  handleUsernameChange,
  setUserState,
}) {
  const { push } = useRouter();

  // const getInitials = (userName) => {
  //   return userName
  //     .match(/(\b\S)?/g)
  //     .join("")
  //     .toUpperCase();
  // };
  const handleLogoClick = () => {
    setUserState({ userName: "", forcedLandingPage: true });
    push("/");
  };

  return (
    <header className="p-2 relative z-30 bg-base-100">
      <div className="container mx-auto flex gap-2 justify-between">
        <div
          className="flex gap-1 items-center cursor-pointer"
          onClick={handleLogoClick}
        >
          <Image
            src={Logo}
            height={50}
            width={50}
            alt="Agile Poker Planner"
            className="m-2"
          />
          <span className="font-black text-3xl">Agile Poker Planner</span>
        </div>
        {userName && (
          <div
            className="flex gap-2 items-center tooltip tooltip-left"
            data-tip="Click to modify your username"
          >
            <div className="avatar placeholder flex items-center">
              <span className="text-neutral-focus m-2">{userName}</span>
              <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                <FaUserEdit
                  onClick={handleUsernameChange}
                  size="1.5em"
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
