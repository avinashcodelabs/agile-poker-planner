"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import GlobalHeader from "@/components/header";
import LandingPage from "../landingPage/page";

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
    <div>
      <GlobalHeader />
      <LandingPage />
    </div>
  );
}
