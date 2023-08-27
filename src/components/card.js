"use client";

import classNames from "classnames";
import Image from "next/image";
import { useState } from "react";
import Verified from "../public/images/verified.gif";

export default function Card({ reveal, userName, vote }) {
  const getInitials = (userName) => {
    return userName
      ? userName
          .match(/(\b\S)?/g)
          .join("")
          .toUpperCase()
      : "";
  };

  return (
    <div className="card-container w-48">
      <div className={classNames({ "card-inner": reveal && vote })}>
        {/* Front */}
        <div className="card card-front bg-secondary shadow-xl p-6 relative">
          <div className="items-center text-center flex flex-col gap-4">
            <div className="avatar placeholder flex flex-col justify-center items-center">
              <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                <span>{getInitials(userName)}</span>
              </div>
            </div>
            <div className="text-neutral-focus font-semibold text-center">
              {userName}
            </div>
            {vote ? (
              <div className="w-6 h-6">
                <Image src={Verified} alt="voted" />
              </div>
            ) : (
              <div className="h-6 loading loading-ring loading-md"></div>
            )}
          </div>
        </div>
        {/* Back */}
        <div className="card card-back bg-accent shadow-xl p-6 absolute w-full h-full top-0 left-0">
          <div className="items-center text-center flex flex-col gap-4">
            <div className="avatar placeholder flex flex-col justify-center items-center">
              <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                <span>{getInitials(userName)}</span>
              </div>
            </div>
            <div className="text-base-100 text-center">{userName}</div>
            <h2 className="card-title text-center font-bold text-2xl text-base-100">
              {vote}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
