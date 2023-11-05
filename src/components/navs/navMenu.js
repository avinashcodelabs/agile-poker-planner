import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React from "react";
import { CiDark } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { FiGithub } from "react-icons/fi";
import { GoHistory } from "react-icons/go";
import {
  LiaExternalLinkAltSolid,
  LiaUserEditSolid,
  LiaUsersCogSolid,
} from "react-icons/lia";
import { TbHandClick } from "react-icons/tb";

import { InviteLink } from "@/components/inviteLink.js";
import { QrCode } from "@/components/qrCode";
import MenuIcon from "../../../public/images/menu.png";

const NavMenu = (props) => {
  const { userName, handleUserRename, room } = props;
  const [isNameRenameAble, setIsNameRenameAble] = React.useState(false);
  const newUseNameRef = React.useState(null);
  const searchParams = useSearchParams();

  const makeRenameAble = () => {
    setIsNameRenameAble(true);
    // newUseNameRef.current.focus();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleUserRename(newUseNameRef.current.value);
    setIsNameRenameAble(false);
  };

  return (
    <div className="flex gap-4 me-3 mt-3">
      <InviteLink room={room} />
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
              onClick={makeRenameAble}
              className="hover:bg-inherit focus:bg-inherit"
            >
              {isNameRenameAble ? (
                <form onSubmit={handleSubmit} className="join">
                  <input
                    ref={newUseNameRef}
                    type="text"
                    className="input input-bordered input-sm join-item w-full max-w-xs"
                    placeholder="new name"
                    defaultValue={userName}
                  />
                  <button
                    type="submit"
                    className="btn btn-sm join-item w-full max-w-xs"
                  >
                    <TbHandClick size={"1.25em"} />
                  </button>
                </form>
              ) : (
                <a className="">
                  <LiaUserEditSolid
                    size="1.4em"
                    className="cursor-pointer me-1"
                  />
                  <div>
                    Change name :
                    <span className="font-bold ms-1">{userName}</span>
                  </div>
                </a>
              )}
            </li>
            <li className="hover:bg-inherit focus:bg-inherit">
              <a
                className="border-b pb-4 tooltip tooltip-left flex"
                data-tip="Click on any user's card/tile and pick 'Set as host'"
              >
                <LiaUsersCogSolid
                  size="1.4em"
                  className="cursor-pointer me-1"
                />
                <span>Set others as host</span>
              </a>
            </li>
            <li>
              <a>
                <CiDark size="1.25em" className="cursor-pointer me-1" />
                Dark mode <sub className="font-features subs">coming soon</sub>
              </a>
            </li>
            <li>
              <a className="border-b pb-4">
                <GoHistory size="1.25em" className="cursor-pointer me-1" />
                History <sub className="font-features subs">coming soon</sub>
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
              <QrCode room={room} />
              <span>Scan QR to join room</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export { NavMenu };
