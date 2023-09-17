"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";
import { Loading } from "@/components/loading";
import { Deck } from "@/components/deck";
import Card from "@/components/card";
import Agreement from "@/components/agreement";

let socket;

export default function Room({ room, userName, isAdmin }) {
  const [users, setUsers] = useState([]);
  const [roomInfo, setRoomInfo] = useState({});

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

  return (
    <main
      className="container mx-auto flex gap-5 flex-col p-2 flex-1 w-full "
      style={{
        height: `calc(100vh) - 70px`,
      }}
    >
      {isAdmin && (
        <div className="flex flex-col md:flex-row gap-2 items-center self-start pt-2">
          <input
            className="input input-bordered rounded-xl input-primary w-96"
            placeholder="Enter story title"
          />
          <div className="flex self-start gap-2">
            <div className="cursor-pointer label">
              <button
                onClick={handleStartNewVote}
                className="btn btn-primary text-base-100 normal-case rounded-lg font-medium"
              >
                Start New Voting
              </button>
            </div>
            <div className="cursor-pointer label">
              <span className="label-text font-semibold px-2 text-lg">
                Reveal Votes
              </span>
              <input
                type="checkbox"
                className="toggle toggle-success toggle-lg"
                checked={roomInfo.revealState === "open"}
                onClick={toggleRevealState}
              />
            </div>
          </div>
        </div>
      )}
      <div className="flex gap-4 items-center self-start pt-2">
        <label className="font-bold">Story:</label>
        <span className="font-bold">This is a really awesome story</span>
      </div>
      <div className="flex-1 pb-[400px]">
        <label className="font-bold mb-2">Participants:</label>
        <div className="flex flex-wrap items-center justify-center md:items-start md:justify-start">
          {users.map((user, index) => {
            return (
              <Card
                reveal={roomInfo.revealState === "open"}
                index={index}
                {...user}
                key={user.id}
              />
            );
          })}
        </div>
      </div>

      <div className="voting-floater rounded-2xl p-3 bottom-1 bg-base-200 drop-shadow-md">
        <div className="container mx-auto flex flex-col gap-5 justify-center items-center">
          {isAdmin && (
            <div className="flex gap-2 items-center self-start lg:absolute">
              <input
                className="checkbox checkbox-success rounded-lg"
                type="checkbox"
                placeholder="Enter story title"
              />
              <label className="font-bold font-neutral">
                Vote as participant
              </label>
            </div>
          )}

          {roomInfo.revealState === "open" ? (
            <Agreement users={users} />
          ) : (
            <Deck onVote={handleVote} users={users} userName={userName}></Deck>
          )}
        </div>
      </div>
    </main>
  );
}
