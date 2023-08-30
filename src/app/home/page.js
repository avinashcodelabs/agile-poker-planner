"use client";

import GlobalHeader from "@/components/header";
import { useSearchParams } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import Room from "../room/page";
import LandingPage from "../landingPage/page";
import { v4 as uuid4 } from "uuid";
import { Loading } from "@/components/loading";

export default function Home() {
  const searchParams = useSearchParams();
  const [state, setState] = useState({
    room: searchParams.get("room") || uuid4(),
    isAdmin: !searchParams.get("room"),
    userName: null,
    loadingUserName: true,
  });

  useLayoutEffect(() => {
    const savedUserName = window.localStorage.getItem("userName");
    console.log(savedUserName, window.localStorage);
    setState((state) => ({
      ...state,
      userName: state.userName || savedUserName,
      loadingUserName: false,
    }));
  }, []);

  const handleSetUserName = (userName) => {
    window.localStorage.setItem("userName", userName);
    setState({ ...state, userName });
  };

  return (
    <div>
      <GlobalHeader userName={state.userName}/>
      {state.loadingUserName ? (
        <Loading />
      ) : state?.userName ? (
        <Room room={state.room} userName={state.userName} />
      ) : (
        <LandingPage
          isAdmin={state.isAdmin}
          handleSetUserName={handleSetUserName}
        />
      )}
    </div>
  );
}
