import Image from "next/image";
import MenuIcon from "../../public/images/menu.png";
import { InviteColleague } from "./inviteColleague";

export const Drawer = ({ room }) => {
  return (
    <div className="drawer drawer-end w-9 p-2 lg:drawer-open lg:w-80">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col pt-3">
        <label htmlFor="my-drawer-2" className="drawer-button lg:hidden">
          <Image
            src={MenuIcon}
            alt="MenuIcon"
            className="cursor-pointer"
            width={16}
          />
        </label>
      </div>
      <div className="drawer-side mt-24 lg:mt-0 drawer-teal-400">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="flex justify-start p-2 lg:p-0 w-80 min-h-full text-base-content bg-teal-50 lg:bg-transparent ">
          <li>
            <InviteColleague room={room}></InviteColleague>
          </li>
        </ul>
      </div>
    </div>
  );
};
