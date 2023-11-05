"use client";

import Agreement from "@/components/agreement";
import Card from "@/components/card";
import { CustomMenu } from "@/components/customMenu";
import { Deck } from "@/components/deck";
import { Firework } from "@/components/firework";
import { Loading } from "@/components/loading";
import { RoomNav } from "@/components/navs/roomNav";
import { useLocalStorage } from "@uidotdev/usehooks";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useContextMenu } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import io from "socket.io-client";

let socket;

export default function RoomPage({ params }) {
  const room = params.roomId;
  const [userName, setUserName] = useLocalStorage("userName", "");
  if (!room) {
    redirect("/");
  }
  if (room && userName === "") {
    redirect(`/?roomid=${room}`);
  }

  const [users, setUsers] = useState([]);
  const [roomInfo, setRoomInfo] = useState({});
  const [newStoryTitle, setNewStoryTitle] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const userTileMenuId = "userTileMenuId";
  const { show } = useContextMenu({
    id: userTileMenuId,
  });

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
      setCurrentUserId(socket.id);
    });

    socket.emit("user-joined", { room, userName });
    socket.on("room-users", (data) => {
      setUsers(data.users);
      setRoomInfo(data.roomInfo);
    });
  };

  const handleVote = (vote) => {
    socket.emit("user-update", { vote });
  };

  const toggleRevealState = () => {
    const doWeHaveMinOneVote = users.some((user) => user.vote); // To check all the users voted, change some to every
    if (!doWeHaveMinOneVote) return;

    socket.emit("room-info-update", {
      room,
      revealState: roomInfo.revealState === "open" ? "close" : "open",
    });
  };

  const handleStartNewVote = (e) => {
    e.preventDefault();
    socket.emit("room-info-update", {
      room,
      revealState: "close",
      userStory: {
        title: newStoryTitle,
        description: null,
      },
      startNewVote: true,
    });
    document.getElementById("story-title-input-field").value = "";
    setNewStoryTitle("");
  };

  const handleAssignAdmin = (userId) => {
    socket.emit("room-info-update", {
      room,
      newAdminId: userId,
    });
  };

  const handleUserTileClick = (userId, event) => {
    if (roomInfo.roomAdmin !== userId && roomInfo.roomAdmin === currentUserId) {
      show({ event, props: { userId } });
    }
  };

  const handleUserRename = (newName) => {
    setUserName(newName);
    socket.emit("user-update", { userName: newName });
  };

  if (!users.length) {
    return <Loading />;
  }

  return (
    <>
      {roomInfo.revealState === "open" ? (
        <Firework revealState={roomInfo.revealState} />
      ) : null}
      <RoomNav
        room={room}
        userName={userName}
        handleUserRename={handleUserRename}
      />
      <div
        className="flex flex-col"
        style={{
          backgroundImage: `url('https://www.toptal.com/designers/subtlepatterns/uploads/double-bubble-outline.png')`,
          height: "calc(100vh - 86px)",
        }}
      >
        <main
          className="container mx-auto flex gap-5 flex-col p-2 flex-1 w-full "
          style={{
            height: `calc(100vh) - 70px`,
          }}
        >
          <div className="flex flex-row justify-between p-2">
            <div className="flex-1">
              {currentUserId === roomInfo.roomAdmin && (
                <form
                  onSubmit={handleStartNewVote}
                  className="flex flex-col lg:flex-row gap-2 items-center self-start"
                >
                  <div className="self-start gap-2 w-full lg:w-96 flex items-center px-1 py-2">
                    <input
                      id="story-title-input-field"
                      className="input input-bordered rounded-xl input-primary w-full"
                      placeholder="Please enter the user story title (optional)"
                      onChange={(event) => {
                        setNewStoryTitle(event.target.value);
                      }}
                    />
                  </div>
                  <div className="flex self-start gap-2">
                    <div className="cursor-pointer label">
                      <button
                        type="submit"
                        className="btn btn-primary text-base-100 normal-case rounded-lg font-medium"
                      >
                        Start New Voting
                      </button>
                    </div>
                    <div
                      className="cursor-pointer label"
                      onClick={toggleRevealState}
                    >
                      <span className="label-text font-semibold px-2 text-lg">
                        Reveal Votes
                      </span>
                      <input
                        type="checkbox"
                        className="toggle toggle-success toggle-lg"
                        checked={roomInfo.revealState === "open"}
                        onChange={toggleRevealState}
                      />
                    </div>
                  </div>
                </form>
              )}
              {roomInfo.userStory.title ? (
                <div className="flex gap-2 items-center self-start pt-2 p-2">
                  <label className="font-medium">{`You'll estimate for :`}</label>
                  <p className="font-bold">{roomInfo.userStory.title}</p>
                </div>
              ) : null}

              <div className="flex-1 pb-[400px]">
                <div className="flex flex-wrap mt-2 items-center justify-center md:items-start md:justify-start">
                  {users.map((user, index) => {
                    return (
                      <Card
                        onClick={(event) => {
                          handleUserTileClick(user.id, event);
                        }}
                        onContextMenu={(event) => {
                          handleUserTileClick(user.id, event);
                        }}
                        reveal={roomInfo.revealState === "open"}
                        isAdmin={roomInfo.roomAdmin === user.id}
                        index={index}
                        {...user}
                        key={user.id}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div
            className="voting-floater rounded-tl-2xl rounded-tr-2xl
           p-3 bottom-1 drop-shadow-lg bg-white shadow-2xl md:shadow-none
           shadow-teal-200 md:drop-shadow-md md:bg-primary md:bg-opacity-10"
          >
            <div className="container mx-auto flex flex-col gap-5 justify-center items-center">
              {roomInfo.revealState === "open" ? (
                <Agreement users={users} />
              ) : (
                <Deck
                  onVote={handleVote}
                  users={users}
                  userName={userName}
                ></Deck>
              )}
            </div>
          </div>
          <CustomMenu
            menuId={userTileMenuId}
            handleOnClick={(event) => {
              handleAssignAdmin(event.props.userId);
            }}
          />
        </main>
      </div>
    </>
  );
}
