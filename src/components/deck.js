import { generateFibonacciSeries } from "@/lib/utils";

const Deck = ({ onVote }) => {
  const fibonacciNumbers = generateFibonacciSeries();
  return (
    <div className="join flex gap-2 p-2 flex-1 justify-center items-center">
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
      className="btn btn-md md:btn-lg btn-primary text-base-100"
    >
      {number}
    </button>
  );
};

export { Deck };
