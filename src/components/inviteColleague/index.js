import { InviteLink } from "./InviteLink";
import { QrCode } from "./qrCode";
import { getInviteRoomLink } from "@/lib/utils";

const InviteColleague = ({ room }) => {
  const roomInviteLink = getInviteRoomLink(room);
  return (
    <div className="">
      <div className="flex flex-col gap-y-5 items-center">
        <InviteLink link={roomInviteLink} />
        <QrCode link={roomInviteLink}></QrCode>
      </div>
    </div>
  );
};

export { InviteColleague };
