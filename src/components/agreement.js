import VotingChart from "./votingChart";

const calculateAgreement = (users) => {
  const counts = {};
  let max = 0;

  for (let i = 0; i < users.length; i++) {
    const num = users[i].vote;
    if (counts[num]) {
      counts[num]++;
    } else {
      counts[num] = 1;
    }
    max = max < counts[num] ? counts[num] : max;
  }

  return { counts: counts, totalVotes: users.length };
};

const getPercent = (val, total) => (val * 100) / total;

const getAverage = (counts, totalVotes) =>
  Object.keys(counts).reduce((acc, curr) => parseInt(acc) + parseInt(curr), 0) /
  totalVotes;

const Agreement = ({ users }) => {
  const { counts, totalVotes } = calculateAgreement(users);

  return (
    <div className="flex flex-row gap-4 flex-wrap justify-center w-full">
      <div className="flex justify-center items-center flex-col">
        <p>Average</p>
        <p className="font-bold text-4xl">
          {parseFloat(getAverage(counts, totalVotes)).toFixed(2)}
        </p>
      </div>

      <VotingChart
        data={Object.entries(counts).map(([key, val]) => ({
          point: key,
          count: val,
        }))}
      />
    </div>
  );
};

export default Agreement;
