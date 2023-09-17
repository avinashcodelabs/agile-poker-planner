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

const Agreement = ({ users }) => {
  const { counts, totalVotes } = calculateAgreement(users);

  return (
    <div className="flex flex-col gap-2 pb-2 flex-wrap">
      <label className="font-bold text-lg text-center">Agreement</label>
      {Object.entries(counts).map(([key, val], index) => (
        <span className="flex gap-2 items-center" key={index}>
          <span className="font-bold">{key}</span>
          <progress
            className="progress progress-success w-64 md:w-96"
            value={getPercent(val, totalVotes)}
            max={100}
          ></progress>
        </span>
      ))}
    </div>
  );
};

export default Agreement;
