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
  const [userName, setUserName] = useLocalStorage("userName", null);
  const room = searchParams.get("room") || uuid4();
  const isAdmin = !searchParams.get("room");

  const handleSetUserName = (userName) => {
    setUserName(userName);
  };

  return (
    <div>
      <GlobalHeader userName={userName} handleResetName={()=>setUserName(null)}/>
      {userName ? (
        <Room room={room} userName={userName} />
      ) : (
        <LandingPage
          isAdmin={isAdmin}
          handleSetUserName={handleSetUserName}
        />
      )}
    </div>
  );
}
