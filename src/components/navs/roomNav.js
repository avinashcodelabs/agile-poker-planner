import { Logo } from "@/components/navs/logo";
import { NavMenu } from "@/components/navs/navMenu";

function RoomNav(props) {
  const { userName, handleUserRename } = props;
  return (
    <header className="p-2 relative z-30 bg-base-100">
      <div className="container mx-auto flex gap-2 justify-between">
        <Logo />
        <NavMenu userName={userName} handleUserRename={handleUserRename} />
      </div>
    </header>
  );
}

export { RoomNav };
