import { MainNav } from "@/components/navs/mainNav";
import ParticipantsCard from "@/components/participants";
import Image from "next/image";
import BgImage from "../../public/images/bgimg.jpg";

export default function LandingPage() {
  return (
    <>
      <MainNav />
      <div
        className="flex flex-col"
        style={{
          backgroundImage: `url('https://www.toptal.com/designers/subtlepatterns/uploads/double-bubble-outline.png')`,
          height: "calc(100vh - 86px)",
        }}
      >
        <main className="mx-8">
          <div
            className="container mx-auto flex p-5 md:p-0 lg:p-0 justify-center"
            style={{ height: `calc(100vh - 82px)` }}
          >
            <div className="flex-1 flex relative z-10">
              <div className="flex flex-col gap-2 max-w-sm lg:max-w-lg flex-1">
                <h1 className="font-bold text-3xl md:text-5xl text-primary  md:mt-12 md:mb-6">
                  Play Your Cards Right with Planning Poker!
                </h1>
                <div className="md:block py-6 text-lg">
                  <p>Simplify Estimations Effortlessly!</p>
                  <p>
                    Our
                    <span className="font-bold mx-1">Free,</span>
                    <span className="font-bold me-1">No-Sign-In,</span>
                    Open-Source App Ensures Ultimate
                    <span className="font-bold mx-1">Data Privacy.</span>
                    Intuitive and Hassle-Free
                  </p>
                </div>
                <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100 shadow-teal-300/50 border-primary border">
                  <div className="card-body flex">
                    <ParticipantsCard />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 items-center md:flex-col hidden md:block lg:block">
              <Image
                height={600}
                src={BgImage}
                alt="Agile Poker Planner"
                className="m-2 relative mix-blend-darken"
                placeholder="blur"
                priority
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
