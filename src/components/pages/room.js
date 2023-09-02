"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";
import { Loading } from "@/components/loading";
import { Deck } from "@/components/deck";
import Card from "@/components/card";

let socket;

export default function Room({ room, userName }) {
  const [users, setUsers] = useState([]);
  const [roomInfo, setRoomInfo] = useState({});
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    initSocket();
    return () => {
      socket.disconnect();
    };
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
      setRoomInfo(data.roomInfo);
    });
  };

  if (!users.length) {
    return <Loading />;
  }

  const handleVote = (vote) => {
    socket.emit("user-vote", { room, userName, vote });
  };

  const toggleRevealState = () => {
    socket.emit("room-info-update", {
      room,
      revealState: roomInfo.revealState === "open" ? "close" : "open",
    });
  };

  const handleStartNewVote = () => {
    socket.emit("start-new-vote", { room });
  };

  const copyUrlToClipboard = async () => {
    const joinRoomLink = `${window.location.host}/?room=${room}`;
    await navigator.clipboard.writeText(joinRoomLink);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 1 * 1000);
  };

  return (
    <div>
      <div className="container mx-auto flex gap-2 flex-col mt-4">
        <div className="relative self-end">
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
                <div className="flex">
                  {users.map((user) => {
                    return (
                      <Card
                        reveal={roomInfo.revealState === "open"}
                        {...user}
                        key={user.id}
                      />
                    );
                  })}
                </div>
                <div className="form-control flex-row">
                  <label className="cursor-pointer label">
                    <span className="label-text font-semibold px-2 text-lg">
                      Reveal Votes
                    </span>
                    <input
                      type="checkbox"
                      className="toggle toggle-success toggle-lg"
                      checked={roomInfo.revealState === "open"}
                      onClick={toggleRevealState}
                    />
                  </label>
                  <label className="cursor-pointer label ml-8">
                    <span
                      onClick={handleStartNewVote}
                      className="label-text font-extrabold py-2 px-3 text-lg bg-blue-400 rounded-lg"
                    >
                      Start New Voting
                    </span>
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
    </div>
  );
}
