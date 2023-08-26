const UserCard = ({ user, showSelectedNumber }) => {
  const { userName, vote } = user;

  const renderSelectedNumber = () => {
    if (showSelectedNumber && vote) {
      return vote;
    } else if (!showSelectedNumber && vote) {
      return "👍";
    } else {
      return <span className="loading loading-ring loading-md"></span>;
    }
  };

  return (
    <div className="stats shadow-xl bg-teal-50 me-16 w-40 h-44">
      <div className="stat place-items-center gap-4">
        <div className="stat-title font-bold text-lg">
          🟢&nbsp;&nbsp;{userName}
        </div>
        <div className="stat-value">{renderSelectedNumber()}</div>
        <div className="stat-desc"></div>
      </div>
    </div>
  );
};

export { UserCard };
