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
        <div
          className="flex gap-0.5 items-center flex-col  w-64 md:w-96"
          key={index}
        >
          <span className="flex justify-between  w-64 md:w-96">
            <span className="font-bold">{key}</span>
            <span>{`${getPercent(val, totalVotes)}%`}</span>
          </span>
          <progress
            className="progress progress-primary"
            value={getPercent(val, totalVotes)}
            max={100}
          ></progress>
          <span className=" self-start">{`${val} vote(s)`}</span>
        </div>
      ))}
    </div>
  );
};

export default Agreement;
