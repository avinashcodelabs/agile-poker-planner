"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuid4 } from "uuid";
import classNames from "classnames";

export default function AdminCard() {
  const [userName, setUserName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [isError, setError] = useState(false);
  const router = useRouter();

  const handleCreateRoom = () => {
    if (userName.length < 3 || roomName < 3) {
      setError(true);
      return;
    }
    const uniqueId = uuid4();
    const roomLink = `/room?room=${uniqueId}&username=${userName}&roomname=${roomName}`;
    router.push(roomLink);
  };

  return (
    <>
      <h1 className="text-center text-lg text-primary text-bold">
        Create a Room
      </h1>
      <div className="form-control mt-4">
        <input
          onChange={(e) => {
            setRoomName(e.target.value);
          }}
          value={roomName}
          type="text"
          placeholder="Enter a room name"
          className={classNames("input input-bordered border border-primary", {
            "border-red-600": isError && roomName.length < 3,
          })}
        />
      </div>
      <div className="form-control mt-4">
        <input
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          value={userName}
          type="text"
          placeholder="Admin name"
          className={classNames("input input-bordered border border-primary", {
            "border-red-600": isError && userName.length < 3,
          })}
        />
      </div>
      <div className="form-control mt-6 w-fit self-end">
        <button className="btn btn-primary" onClick={handleCreateRoom}>
          Create Room
        </button>
      </div>
    </>
  );
}
