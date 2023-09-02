"use client";

import GlobalHeader from "@/components/header";
import { useSearchParams } from "next/navigation";
import Room from "@/components/pages/room";
import LandingPage from "@/components/pages/landingPage";
import { v4 as uuid4 } from "uuid";
import { useLocalStorage } from "@uidotdev/usehooks";

export default function Home() {
  const searchParams = useSearchParams();
  // throws an error in server and sets the value to null which is an accepted behaviour for our requirement
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

  const handleOpenLandingPage = () => {
    setUserState((prevState) => ({ ...prevState, forcedLandingPage: true }));
  };

  return (
    <div>
      <GlobalHeader
        userName={userState.userName}
        handleOpenLandingPage={handleOpenLandingPage}
      />
      {userState.userName && !userState.forcedLandingPage ? (
        <Room room={room} userName={userState.userName} />
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
