import Image from "next/image";
import adminImage from "../public/images/admin25x25.png";

const AdminIcon = () => {
  return (
    <Image src={adminImage} alt="admin" className="absolute top-2 end-2" />
  );
};

export { AdminIcon };
