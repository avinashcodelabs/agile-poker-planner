import { Fireworks } from "@fireworks-js/react";
import React from "react";

const Firework = (props) => {
  const { revealState } = props;
  const ref = React.useRef(null);

  React.useEffect(() => {
    let timer;
    if (revealState === "open") {
      timer = setTimeout(() => {
        ref.current.stop();
      }, 1500);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [revealState]);

  return (
    <>
      <Fireworks
        ref={ref}
        options={{
          opacity: 0.5,
          sound: {
            enabled: true,
            files: ["/party.mp3"],
            volume: {
              max: 2,
              min: 2,
            },
          },
        }}
        style={{
          top: "25%",
          left: "35%",
          width: "50%",
          height: "50%",
          position: "fixed",
        }}
      />
    </>
  );
};

export { Firework };
