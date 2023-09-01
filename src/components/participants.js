"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import classNames from "classnames";

export default function ParticipantsCard({ handleSetUserName, isAdmin }) {
  const [userName, setUserName] = useState("");
  const [isError, setError] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const room = searchParams.get("room");

  const handleClick = (e) => {
    if (userName.length < 3) {
      setError(true);
      return;
    }
    if (userName.length >= 3) {
      handleSetUserName(userName);
    }
  };
  return (
    <>
      {isAdmin ? (
        <>
          <h1 className="text-center text-lg text-primary text-bold">
            Create a Room
          </h1>
        </>
      ) : (
        <>
          <h1 className="text-center text-lg text-primary text-bold">
            Join a room
          </h1>
          <h1 className="text-center text-bold">
            {`You have been invited to join a room`}
          </h1>
        </>
      )}

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
        <button className="btn btn-primary text-base-100" onClick={handleClick}>
          Join Room
        </button>
      </div>
    </>
  );
}
