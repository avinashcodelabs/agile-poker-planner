import Image from "next/image";
import adminImage from "../public/images/admin25x25.png";
// import { GrUserAdmin } from "react-icons/gr";

// todo: we will user either react icon or admin image to show as room admin

const AdminIcon = () => {
  return (
    <Image src={adminImage} alt="admin" className="absolute top-2 end-2" />
    // <GrUserAdmin className="absolute top-3 end-3" />
  );
};

export { AdminIcon };
