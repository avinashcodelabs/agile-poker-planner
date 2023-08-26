import { generateFibonacciSeries } from "@/lib/utils";

const Deck = ({ onVote }) => {
  const fibonacciNumbers = generateFibonacciSeries();
  return (
    <div className="join">
      {fibonacciNumbers.map((number, index) => (
        <VoteCard onVote={onVote} number={number} key={index}></VoteCard>
      ))}
    </div>
  );
};

const VoteCard = ({ number, onVote }) => {
  return (
    <button
      onClick={() => onVote(number)}
      className="btn btn-lg bg-blue-400 m-2 text-3xl"
    >
      {number}
    </button>
  );
};

export { Deck };
