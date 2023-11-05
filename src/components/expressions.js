import Image from "next/image";
import Bored from "../../public/images/bored.gif";
import Excited from "../../public/images/excited.gif";
import Happy from "../../public/images/happy.gif";
import Neutral from "../../public/images/neutral.gif";
import Surprised from "../../public/images/surprised.gif";

const getExpressionsUI = (msg, imageName) => (
  <div className="chat chat-start">
    <div className="chat-image avatar">
      <div className="w-16 rounded-full">
        <Image
          src={imageName}
          alt="highfive"
          width={60}
          className="mix-blend-normal rounded-full"
        />
      </div>
    </div>
    <div className="chat-bubble chat-bubble-primary" style={{ color: "#fff" }}>
      {msg}
    </div>
  </div>
);

const getExpressions = (agreementData, totalVotes) => {
  console.log("counts", totalVotes);
  const { agreement, mostvoted } = agreementData;
  if (agreement === 100) {
    const msg = `woo-hoo !!! ${agreement}% Agreement on ${mostvoted}`;
    return getExpressionsUI(msg, Excited);
  }
  if (agreement < 100 && agreement > 50) {
    const msg = `Yay !!! ${agreement}% Agreement on ${mostvoted}`;
    return getExpressionsUI(msg, Happy);
  }
  if (agreement === 50) {
    const msg = `Ah oh !!! ${agreement}% Agreement on ${mostvoted}`;
    return getExpressionsUI(msg, Neutral);
  }
  if (agreement < 50) {
    if (mostvoted.length === totalVotes) {
      const msg = `Oh no !!! Got equal votes for ${mostvoted}`;
      return getExpressionsUI(msg, Bored);
    }
    const msg = `Oh no !!! ${agreement}% Agreement on ${mostvoted}`;
    return getExpressionsUI(msg, Surprised);
  }
};
export const Expressions = ({ agreement, totalVotes }) => (
  <div className="flex justify-center items-center flex-row">
    {getExpressions(agreement, totalVotes)}
  </div>
);
