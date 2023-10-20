import { useSearchParams } from "next/navigation";
import { NavMenu } from "@/components/navs/navMenu";
import { Logo } from "@/components/navs/logo";

function RoomNav() {
  const searchParams = useSearchParams();
  const roomId = searchParams.get("roomid");

  return (
    <header className="p-2 relative z-30 bg-base-100">
      <div className="container mx-auto flex gap-2 justify-between">
        <Logo />
        <NavMenu room={roomId} />
      </div>
    </header>
  );
}

export { RoomNav };
