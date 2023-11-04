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

const getAverage = (counts, totalVotes) => {
  // const  totalVotes = Object.values(totalVotes).reduce((a, b) => a + b, 0)
  const avg =
    Object.entries(counts).reduce((acc, curr) => {
      let temp = parseInt(curr[0]) * parseInt(curr[1]);
      return parseInt(temp + acc);
    }, 0) / totalVotes;
  return avg;
};

const Agreement = ({ users }) => {
  const { counts, totalVotes } = calculateAgreement(users);
  const commonPointVoted = Math.max(...Object.values(counts));

  return (
    <div className="flex gap-10 w-full items-center justify-center">
      <div className="flex justify-center">
        <p>
          <span className="text-lg">Average:</span>
          <span className="text-gray-600 ms-1 font-bold text-xl">
            {parseFloat(getAverage(counts, totalVotes)).toFixed(2)}
          </span>
        </p>
      </div>
      <div className="flex gap-8">
        {Object.entries(counts).map((value, idx) => (
          <div key={idx} className="flex flex-col items-center gap-1">
            <div
              className={`flex h-16 w-10 items-center justify-center rounded-xl bg-gray-100 shadow-md ${
                value[1] == commonPointVoted ? " shadow-green-700" : ""
              }`}
            >
              <span className="font-bold">{value[0]}</span>
            </div>
            <div>
              {value[1]}
              <span className="ms-1">{value[1] == 1 ? "Vote" : "Votes"}</span>
            </div>
          </div>
        ))}
      </div>

      {/* <VotingChart
        data={Object.entries(counts).map(([key, val]) => ({
          point: key,
          count: val,
        }))}
      /> */}
    </div>
  );
};

export default Agreement;
