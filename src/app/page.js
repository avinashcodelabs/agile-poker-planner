"use client";

import GlobalHeader from "@/components/header";
import { useSearchParams } from "next/navigation";
import Room from "@/components/pages/room";
import LandingPage from "@/components/pages/landingPage";
import { v4 as uuid4 } from "uuid";
import { useLocalStorage } from "@uidotdev/usehooks";

export default function Home() {
  const searchParams = useSearchParams();
  // throws an error in server and sets the value to null which is an accepted behavior for our requirement
  const [userState, setUserState] = useLocalStorage("userState", {
    userName: "",
    forcedLandingPage: true,
  });
  const room = searchParams.get("room") || uuid4();
  const isAdmin = !searchParams.get("room");

  const handleSetUserName = (userName) => {
    setUserState({
      userName,
      forcedLandingPage: false,
    });
  };

  const handleUsernameChange = () => {
    setUserState((prevState) => ({ ...prevState, forcedLandingPage: true }));
  };

  return (
    <div
      className="flex flex-col"
      style={{
        backgroundImage: `url('https://www.toptal.com/designers/subtlepatterns/uploads/double-bubble-outline.png')`,
      }}
    >
      <GlobalHeader
        userName={userState.userName}
        room={room}
        handleUsernameChange={handleUsernameChange}
        setUserState={setUserState}
      />
      {userState.userName && !userState.forcedLandingPage ? (
        <Room room={room} userName={userState.userName} isAdmin={isAdmin} />
      ) : (
        <LandingPage
          isAdmin={isAdmin}
          handleSetUserName={handleSetUserName}
          placeholderUserName={userState.userName}
        />
      )}
    </div>
  );
}
