import React from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { FaUserEdit } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { LiaExternalLinkAltSolid } from "react-icons/lia";
import { CiDark } from "react-icons/ci";
import { GoHistory } from "react-icons/go";
import { TbHandClick } from "react-icons/tb";

import MenuIcon from "../public/images/menu.png";
import { QrCode } from "./qrCode";
import { InviteLink } from "./inviteLink.js";

const NavMenu = ({ room }) => {
  const [isNameRenameAble, setIsNameRenameAble] = React.useState(false);
  const newUseNameRef = React.useState(null);

  const searchParams = useSearchParams();
  const roomid = searchParams.get("roomid") || room;

  const handleUserRename = () => {
    setIsNameRenameAble(true);
    // newUseNameRef.current.focus();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newUseNameRef.current.value);
    // Update the name to card here
    setIsNameRenameAble(false);
  };

  return (
    <div className="flex gap-8 me-3 mt-3">
      <InviteLink room={roomid} />
      <div className="dropdown dropdown-end">
        <div tabIndex={0} className="p-3 rounded-lg hover:bg-zinc-100">
          <Image
            src={MenuIcon}
            alt="MenuIcon"
            className="cursor-pointer"
            width={16}
          />
        </div>
        <div
          tabIndex={0}
          className="mt-2 z-[1] p-2 menu menu-sm dropdown-content rounded-box w-56 shadow shadow-teal-100/50 bg-white border border-teal-100"
        >
          <ul className="menu w-56 gap-3">
            <li
              onClick={handleUserRename}
              className="hover:bg-inherit focus:bg-inherit"
            >
              {isNameRenameAble ? (
                <form onSubmit={handleSubmit} className="join">
                  <input
                    ref={newUseNameRef}
                    type="text"
                    className="input input-bordered input-sm join-item w-full max-w-xs"
                    placeholder="new name"
                  />
                  <button
                    type="submit"
                    className="btn btn-sm join-item w-full max-w-xs"
                  >
                    <TbHandClick size={"1.25em"} />
                  </button>
                </form>
              ) : (
                <a className="border-b rounded-none pb-4">
                  <FaUserEdit size="1.25em" className="cursor-pointer me-1" />
                  <span>Rename</span>
                </a>
              )}
            </li>
            <li>
              <a>
                <CiDark size="1.25em" className="cursor-pointer me-1" />
                Dark mode <sub class="font-features subs">coming soon</sub>
              </a>
            </li>
            <li>
              <a className="border-b rounded-none pb-4">
                <GoHistory size="1.25em" className="cursor-pointer me-1" />
                History <sub class="font-features subs">coming soon</sub>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/avinashcodelabs/agile-poker-planner"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiGithub size="1.25em" className="cursor-pointer me-1" />
                GitHub
                <LiaExternalLinkAltSolid size="1em" />
              </a>
            </li>
            <li>
              <a
                className="pb-4"
                href="https://twitter.com/agilepokerplan"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaXTwitter size="1.25em" className="cursor-pointer me-1" />
                Twitter X
                <LiaExternalLinkAltSolid size="1em" />
              </a>
            </li>
            <li className="flex flex-col gap-2 self-center">
              <QrCode room={roomid} />
              <span>Scan QR to join room</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export { NavMenu };