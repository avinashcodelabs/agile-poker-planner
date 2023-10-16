"use client";

import classNames from "classnames";
import Image from "next/image";
import Verified from "../public/images/verified.gif";
import getRandomColor from "@/lib/getRandomColor";
import { AdminIcon } from "./adminIcon";

export default function Card(props) {
  const { onClick, onContextMenu, reveal, userName, vote, index, isAdmin } =
    props;
  return (
    <div
      onClick={onClick}
      onContextMenu={onContextMenu}
      className="card-container w-32 md:w-48"
    >
      <div
        style={{
          transitionDelay: `${index + 1}00ms`,
        }}
        className={classNames({ "card-inner": reveal && vote })}
      >
        {/* Front */}
        <div className="card card-front shadow-xl shadow-teal-100/50 p-6 relative bg-white border border-teal-200">
          {isAdmin ? <AdminIcon /> : null}
          <div className="items-center text-center flex flex-col gap-4">
            <div className="avatar placeholder flex flex-col justify-center items-center">
              <div
                className="rounded-full w-14 drop-shadow-md"
                style={{
                  backgroundColor: getRandomColor(),
                  backgroundImage: `url('https://api.dicebear.com/6.x/open-peeps/svg?seed=${userName})`,
                }}
              ></div>
            </div>
            <div className="text-neutral-focus font-semibold text-center text-ellipsis overflow-x-clip overflow-y-hidden h-6 w-32">
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
        <div className="card card-back bg-accent shadow-xl shadow-green-200/50 p-6 absolute w-full h-full top-0 left-0">
          <div className="items-center text-center flex flex-col gap-4">
            <div className="avatar placeholder flex flex-col justify-center items-center">
              <div
                className="rounded-full w-14 drop-shadow-md"
                style={{
                  backgroundColor: getRandomColor(),
                  backgroundImage: `url('https://api.dicebear.com/6.x/open-peeps/svg?seed=${userName})`,
                }}
              ></div>
            </div>
            <div className="text-base-100 text-center font-semibold text-ellipsis overflow-x-clip overflow-y-hidden h-6 w-32">
              {userName}
            </div>
            <h2 className="card-title text-center font-bold text-2xl text-base-100">
              {vote}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
