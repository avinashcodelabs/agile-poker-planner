"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { Loading } from "@/components/loading";
import { Deck } from "@/components/deck";
import { UserCard } from "@/components/userCard";

let socket;

export default function Room() {
  const [users, setUsers] = useState([]);
  const searchParams = useSearchParams();
  const room = searchParams.get("room");
  const userName = searchParams.get("username");
  const [showSelectedNumber, setShowSelectedNumber] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    initSocket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initSocket = async () => {
    await fetch("/api/socket");
    socket = io(undefined, {
      path: "/api/socket_io",
    });
    socket.on("connect", () => {
      console.log("client - connected", socket.id);
    });

    socket.emit("user-joined", { room, userName });
    socket.on("room-users", (data) => {
      setUsers(data.users);
    });
  };

  if (!users.length) {
    return <Loading />;
  }

  const handleVote = (vote) => {
    socket.emit("user-vote", { room, userName, vote });
  };

  const copyUrlToClipboard = async () => {
    const joinRoomLink = `${window.location.host}/username?room=${room}&username=`;
    await navigator.clipboard.writeText(joinRoomLink);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 1 * 1000);
  };

  return (
    <div>
      <div className="absolute top-8 right-12">
        <button
          onClick={copyUrlToClipboard}
          className="btn btn-outline btn-info normal-case rounded-full tracking-wider"
        >
          Invite Colleagues
        </button>
        {showToast ? (
          <div className="toast toast-top toast-end mt-20">
            <div className="alert alert-success bg-green-500 text-gray-900">
              <span>Link Copied</span>
            </div>
          </div>
        ) : null}
      </div>

      <div className="mt-16 ms-3">
        <div className="flex">
          <div className="flex-auto">
            <div className="flex flex-col gap-10 gap-y-16 items-center">
              <div className="h-40">
                {users.map((user) => {
                  return (
                    <UserCard
                      showSelectedNumber={showSelectedNumber}
                      key={user.id}
                      user={user}
                    ></UserCard>
                  );
                })}
              </div>
              <div className="form-control w-32">
                <label className="cursor-pointer label">
                  <span className="label-text font-semibold">Reveal</span>
                  <input
                    type="checkbox"
                    className="toggle toggle-success toggle-lg"
                    defaultChecked={showSelectedNumber}
                    onClick={() =>
                      setShowSelectedNumber((prevState) => !prevState)
                    }
                  />
                </label>
              </div>
              <div>
                <Deck onVote={handleVote}></Deck>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}