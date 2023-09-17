import { generateFibonacciSeries } from "@/lib/utils";
import classNames from "classnames";

let vote;
const Deck = ({ onVote, users, userName }) => {
  vote = users.find((user) => user.userName === userName).vote;

  const fibonacciNumbers = generateFibonacciSeries();
  return (
    <div className="join flex gap-4 p-2 flex-1 justify-center items-center">
      {fibonacciNumbers.map((number, index) => (
        <VoteCard onVote={onVote} number={number} key={index}></VoteCard>
      ))}
    </div>
  );
};

const VoteCard = ({ number, onVote }) => {
  return (
    <button
      onClick={(e) => {
        onVote(number);
      }}
      className={classNames("btn btn-md md:btn-lg btn-primary text-base-100", {
        "btn-primary btn-outline": vote !== number,
      })}
    >
      {number}
    </button>
  );
};

export { Deck };
