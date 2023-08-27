"use client";

import LandingPage from "./landingPage/page";
import GlobalHeader from "@/components/header";

export default function Home() {
  return (
    <div>
      <GlobalHeader />
      <LandingPage isAdmin />
    </div>
  );
}
