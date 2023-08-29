"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuid4 } from "uuid";
import classNames from "classnames";

export default function AdminCard() {
  const [userName, setUserName] = useState("");
  const [isError, setError] = useState(false);
  const router = useRouter();

  const handleCreateRoom = () => {
    if (userName.length < 3) {
      setError(true);
      return;
    }
    window.localStorage.setItem('userName', userName)
    const uniqueId = uuid4();
    const roomLink = `/room?room=${uniqueId}&username=${userName}`;
    router.push(roomLink);
  };


  useEffect(()=> {
    const savedUserName = window.localStorage.getItem('userName')
    console.log(savedUserName, window.localStorage)
    if(savedUserName) {
      const uniqueId = uuid4();
      router.push(`/room?room=${uniqueId}&username=${savedUserName}`)
    }
  })

  return (
    <>
      <h1 className="text-center text-lg text-primary text-bold">
        Create a Room
      </h1>
      <div className="form-control mt-4">
        <input
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          value={userName}
          type="text"
          autoFocus
          placeholder="Admin name"
          className={classNames("input input-bordered border border-primary", {
            "border-red-600": isError && userName.length < 3,
          })}
        />
      </div>
      <div className="form-control mt-6 w-fit self-end">
        <button
          className="btn btn-primary text-base-100"
          onClick={handleCreateRoom}
        >
          Create Room
        </button>
      </div>
    </>
  );
}
