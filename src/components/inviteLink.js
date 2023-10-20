import { getInviteRoomLink, writeToClipboard } from "@/lib/utils";
import { useState } from "react";
import { FaRegCopy } from "react-icons/fa";

const InviteLink = ({ room }) => {
  const roomInviteLink = getInviteRoomLink(room);
  const [showToast, setShowToast] = useState(false);
  const copyUrlToClipboard = async () => {
    writeToClipboard(roomInviteLink);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 1 * 1000);
  };
  return (
    <div
      className="flex gap-2 cursor-pointer items-center rounded-xl h-10 hover:bg-zinc-100 text-teal-500 px-3"
      onClick={copyUrlToClipboard}
    >
      <FaRegCopy size="1.3em" />
      <span className="font-semibold">Invite others</span>
      {showToast ? (
        <div className="toast toast-end">
          <div className="alert alert-success">
            <span>Link Copied</span>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export { InviteLink };
