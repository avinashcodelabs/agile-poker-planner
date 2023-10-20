import { getInviteRoomLink } from "@/lib/utils";
import { QRCodeSVG } from "qrcode.react";

const QrCode = ({ room }) => {
  const roomInviteLink = getInviteRoomLink(room);

  return (
    <QRCodeSVG
      value={roomInviteLink}
      size={100}
      includeMargin={true}
      bgColor={"#58a5b0"}
      fgColor={"#ffffff"}
    />
  );
};

export { QrCode };
