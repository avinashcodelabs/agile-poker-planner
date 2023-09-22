import { QRCodeSVG } from "qrcode.react";

const QrCode = ({ link }) => {
  return (
    <div className="absolute right-5">
      <QRCodeSVG
        value={link}
        size={100}
        includeMargin={true}
        bgColor={"#58a5b0"}
        fgColor={"#ffffff"}
      />
    </div>
  );
};

export { QrCode };
