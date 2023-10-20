"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Logo from "../public/images/logonew.png";
import { useEffect, useState } from "react";
import { NavMenu } from "./navMenu";
import { useLocalStorage } from "@uidotdev/usehooks";

function setCharAt(str, index, chr) {
  if (index > str.length - 1) return str;
  return str.substring(0, index) + chr + str.substring(index + 1);
}

export default function GlobalHeader() {
  const searchParams = useSearchParams();
  const roomId = searchParams.get("roomid");
  const [userName, setUserName] = useLocalStorage("userName", "");
  const [brand, updateBrand] = useState("♣♦♥♠♣♦♥♠♣♦♥♠♠");

  const { push } = useRouter();

  const animateLogo = async (dir) => {
    const shape = "♣♦♥♠";

    if (dir === "in") {
      for (let i = 0; i <= brand.length + 1; i++) {
        setTimeout(() => {
          updateBrand((prev) => {
            return setCharAt(
              prev,
              i,
              shape[Math.floor(Math.random() * shape.length)],
            );
          });
        }, i * 100);
      }
    }
    if (dir === "out") {
      const brand = "Poker Planner";
      for (let i = 0; i <= brand.length + 1; i++) {
        setTimeout(() => {
          updateBrand((prev) => {
            return setCharAt(prev, i, brand[i]);
          });
        }, i * 100);
      }
    }
  };

  useEffect(() => {
    animateLogo("out");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogoClick = () => {
    push(`/${roomId ? `?roomid=${roomId}` : ""}`);
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
            height={60}
            width={60}
            alt="Agile Poker Planner"
            className="m-2"
          />
          <span className="font-black text-3xl logo hidden md:block">
            <span>Agile</span>
            <span>{brand}</span>
          </span>
        </div>
        <NavMenu room={roomId} />

        {/* {userName && (
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
        )} */}
      </div>
    </header>
  );
}
