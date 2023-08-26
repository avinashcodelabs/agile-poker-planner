"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function UserName() {
  const [userName, setUserName] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const room = searchParams.get("room");

  const redirectToRoom = (e) => {
    if (userName.length >= 3 && e.key === "Enter") {
      const roomLink = `/room?room=${room}&username=${userName}`;
      router.push(roomLink);
    }
  };

  return (
    <div className="flex h-screen w-1/5 m-auto mt-56">
      <input
        onChange={(e) => {
          setUserName(e.target.value);
        }}
        value={userName}
        onBlur={redirectToRoom}
        onKeyDown={redirectToRoom}
        type="text"
        placeholder="You'r name here"
        className="input input-bordered input-primary w-full rounded-full text-center"
        autoFocus
      />
    </div>
  );
}
