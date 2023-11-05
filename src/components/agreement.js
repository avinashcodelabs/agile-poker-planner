import classNames from "classnames";
import { useState } from "react";
import { TbChevronDown } from "react-icons/tb";
import { Expressions } from "./expressions";

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

const getAgreement = (d) => {
  let res = 0;
  let totalVotes = 0;
  let mostvoted = [];
  Object.entries(d).forEach(([, val]) => {
    totalVotes = totalVotes + val;
    if (val >= res) {
      res = val;
    }
  });
  const agreement = (res * 100) / totalVotes;

  Object.entries(d).forEach(([key, val]) => {
    if (val === res) {
      mostvoted.push(key);
    }
  });

  return {
    agreement: Number.isInteger(agreement) ? agreement : agreement.toFixed(2),
    mostvoted: mostvoted,
  };
};

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
  const [openPanel, setOpenPanel] = useState(false);

  return (
    <div className="flex gap-10 w-full items-center md:justify-center justify-start">
      {/* mobile screen */}
      <div
        className="md:hidden w-full"
        onClick={() => setOpenPanel(!openPanel)}
      >
        <div className="flex items-center justify-between w-full">
          <Expressions
            className="flex-1"
            agreement={getAgreement(counts)}
            totalVotes={totalVotes}
          />
          <TbChevronDown
            className={classNames("text-2xl", { "rotate-180": openPanel })}
          />
        </div>

        <div
          className={classNames(
            "flex gap-4 items-center pt-2 justify-center transition-all duration-500 overflow-hidden max-h-0 flex-wrap",
            {
              "max-h-screen": openPanel,
            },
          )}
        >
          <p className="flex justify-center flex-col">
            <span className="text-lg">Average</span>
            <span className="text-gray-600 ms-1 font-bold text-xl">
              {parseFloat(getAverage(counts, totalVotes)).toFixed(2)}
            </span>
          </p>
          <div className="flex gap-2 flex-wrap">
            {Object.entries(counts).map((value, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1">
                <div
                  className={`flex h-16 w-10 items-center justify-center rounded-xl bg-gray-100 shadow-md ${
                    value[1] == commonPointVoted
                      ? " shadow-green-700 border border-green-600 "
                      : ""
                  }`}
                >
                  <span className="font-bold">{value[0]}</span>
                </div>
                <div>
                  {value[1]}
                  <span className="ms-1">
                    {value[1] == 1 ? "Vote" : "Votes"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* tablet/desktop screen */}
      <div className="hidden md:flex gap-10 items-center md:justify-center justify-start flex-wrap">
        <p className="flex justify-center flex-col">
          <span className="text-lg">Average</span>
          <span className="text-gray-600 ms-1 font-bold text-xl">
            {parseFloat(getAverage(counts, totalVotes)).toFixed(2)}
          </span>
        </p>
        <div className="flex gap-3">
          {Object.entries(counts).map((value, idx) => (
            <div key={idx} className="flex flex-col items-center gap-1">
              <div
                className={`flex h-16 w-10 items-center justify-center rounded-xl bg-gray-100 shadow-md ${
                  value[1] == commonPointVoted
                    ? " shadow-green-700 border border-green-600 "
                    : ""
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
        <Expressions agreement={getAgreement(counts)} totalVotes={totalVotes} />
      </div>
    </div>
  );
};

export default Agreement;
