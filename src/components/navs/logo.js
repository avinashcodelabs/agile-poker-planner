"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import LogoImage from "../../../public/images/logonew.png";

const Logo = () => {
  const [brand, updateBrand] = React.useState("♣♦♥♠♣♦♥♠♣♦♥♠♠");
  const { push } = useRouter();

  const handleLogoClick = () => {
    window.localStorage.setItem("userName", "");
    push(`/`);
  };

  function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
  }

  const animateLogo = async (dir) => {
    const shape = "♣♦♥♠";

    if (dir === "in") {
      for (let i = 0; i <= brand.length + 1; i++) {
        setTimeout(() => {
          updateBrand((prev) => {
            return setCharAt(
              prev,
              i,
              shape[Math.floor(Math.random() * shape.length)],
            );
          });
        }, i * 100);
      }
    }
    if (dir === "out") {
      const brand = "Poker Planner";
      for (let i = 0; i <= brand.length + 1; i++) {
        setTimeout(() => {
          updateBrand((prev) => {
            return setCharAt(prev, i, brand[i]);
          });
        }, i * 100);
      }
    }
  };

  React.useEffect(() => {
    animateLogo("out");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="flex gap-1 items-center cursor-pointer"
      onClick={handleLogoClick}
    >
      <Image
        src={LogoImage}
        height={60}
        width={60}
        alt="Agile Poker Planner"
        className="m-2"
      />
      <span className="font-black text-3xl logo hidden sm:block">
        <span>Agile</span>
        <span>{brand}</span>
      </span>
    </div>
  );
};

export { Logo };
