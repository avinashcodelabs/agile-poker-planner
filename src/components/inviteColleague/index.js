import { InviteLink } from "./InviteLink";
import { QrCode } from "./qrCode";
import { getInviteRoomLink } from "@/lib/utils";

const InviteColleague = ({ room }) => {
  const roomInviteLink = getInviteRoomLink(room);
  return (
    <div className="absolute right-5 border p-3 shadow-xl shadow-slate-200 rounded-lg bg-zinc-50">
      <div className="flex flex-col gap-y-5 items-center">
        <InviteLink link={roomInviteLink} />
        <QrCode link={roomInviteLink}></QrCode>
      </div>
    </div>
  );
};

export { InviteColleague };
