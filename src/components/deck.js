import { generateFibonacciSeries } from "@/lib/utils";
import classNames from "classnames";
import useSound from "use-sound";

let vote;
const Deck = ({ onVote, users, userName }) => {
  vote = users.find((user) => user.userName === userName)?.vote;

  const fibonacciNumbers = generateFibonacciSeries();
  return (
    <div className="join flex gap-4 p-2 flex-1 justify-center items-center flex-wrap">
      {fibonacciNumbers.map((number, index) => (
        <VoteCard onVote={onVote} number={number} key={index}></VoteCard>
      ))}
    </div>
  );
};

const VoteCard = ({ number, onVote }) => {
  const [play] = useSound("/mausklick.mp3");

  const buttonJsx = (
    <button
      onClick={(e) => {
        onVote(number);
        play();
      }}
      className={classNames("btn btn-md md:btn-lg btn-primary text-base-100", {
        "btn-primary btn-outline bg-base-100": vote !== number,
      })}
    >
      {number}
    </button>
  );
  if (Math.random() < 0.05) {
    // TODO:  have a list of agile memes and select any randomly
    return (
      <div
        className="tooltip"
        data-tip={`Can you underestimate, your own skill of estimation 🤔🤔🤔 ?`}
      >
        {buttonJsx}
      </div>
    );
  }

  return <>{buttonJsx}</>;
};

export { Deck };
