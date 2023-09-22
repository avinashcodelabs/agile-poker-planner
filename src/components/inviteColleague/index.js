import { InviteLink } from "./InviteLink";
import { QrCode } from "./qrCode";
import { getInviteRoomLink } from "@/lib/utils";

const InviteColleague = ({ room }) => {
  const roomInviteLink = getInviteRoomLink(room);
  return (
    <div className="absolute right-5">
      <InviteLink link={roomInviteLink} />
      <QrCode link={roomInviteLink}></QrCode>
    </div>
  );
};

export { InviteColleague };
