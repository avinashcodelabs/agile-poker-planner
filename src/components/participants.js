"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import classNames from "classnames";

export default function ParticipantsCard() {
  const [userName, setUserName] = useState("");
  const [isError, setError] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const room = searchParams.get("room");
  const roomName = searchParams.get("roomname");

  const redirectToRoom = (e) => {
    if (userName.length < 3) {
      setError(true);
      return;
    }
    if (userName.length >= 3) {
      const roomLink = `/room?room=${room}&username=${userName}&roomname=${roomName}`;
      router.push(roomLink);
    }
  };
  return (
    <>
      <h1 className="text-center text-lg text-primary text-bold">
        Join a room
      </h1>
      <h1 className="text-center text-bold">
        {`You have been invited to join ${roomName} room`}
      </h1>
      <div className="form-control mt-4">
        <input
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          value={userName}
          type="text"
          autoFocus
          placeholder="Enter your name"
          className={classNames("input input-bordered border border-primary", {
            "border-red-600": isError && userName.length < 3,
          })}
        />
      </div>
      <div className="form-control mt-6 w-fit self-end">
        <button className="btn btn-primary" onClick={redirectToRoom}>
          Join Room
        </button>
      </div>
    </>
  );
}
