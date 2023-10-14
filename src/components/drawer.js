import Image from "next/image";
import MenuIcon from "../public/images/menu.png";
import { InviteColleague } from "./inviteColleague";

export const Drawer = ({ room }) => {
  return (
    <div class="drawer drawer-end w-9 p-2 lg:drawer-open lg:w-80">
      <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col pt-3">
        <label for="my-drawer-2" class="drawer-button lg:hidden">
          <Image
            src={MenuIcon}
            alt="MenuIcon"
            class="cursor-pointer"
            width={16}
          />
        </label>
      </div>
      <div class="drawer-side mt-24 lg:mt-0 drawer-teal-400">
        <label
          for="my-drawer-2"
          aria-label="close sidebar"
          class="drawer-overlay"
        ></label>
        <ul class="flex justify-start p-2 lg:p-0 w-80 min-h-full text-base-content bg-teal-50 lg:bg-transparent ">
          <li>
            <InviteColleague room={room}></InviteColleague>
          </li>
        </ul>
      </div>
    </div>
  );
};
