"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuid4 } from "uuid";

export default function Home() {
  const [userName, setUserName] = useState("Shiv");
  const router = useRouter();

  const handleCreateRoom = () => {
    const uniqueId = uuid4();
    const roomLink = `/room?room=${uniqueId}&username=${userName}`;
    router.push(roomLink);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col gap-y-8 items-center justify-center">
        <input
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          value={userName}
          type="text"
          placeholder="You'r name here"
          className="input input-bordered input-primary w-full rounded-full text-center"
        />
        <button
          onClick={handleCreateRoom}
          className="btn btn-primary btn-wide rounded-full"
        >
          Create Room
        </button>
      </div>
    </div>
  );
}
