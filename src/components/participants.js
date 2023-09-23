"use client";

import { useState } from "react";
import classNames from "classnames";

export default function ParticipantsCard({
  handleSetUserName,
  isAdmin,
  placeholderUserName = "",
}) {
  const [userName, setUserName] = useState(placeholderUserName);
  const [isError, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userName.length < 3) {
      setError(true);
      return;
    }
    handleSetUserName(userName);
  };
  return (
    <>
      {isAdmin ? (
        <>
          <h1 className="text-lg text-primary font-bold">Create a Room</h1>
        </>
      ) : (
        <>
          <h1 className="text-lg text-primary font-bold">Join a room</h1>
          <h1 className="">{`You have been invited to join a room`}</h1>
        </>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <input
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            value={userName}
            type="text"
            autoFocus
            placeholder="Enter your name"
            className={classNames(
              "input input-bordered border border-primary",
              {
                "border-red-600": isError && userName.length < 3,
              },
            )}
          />
        </div>
        <div className="form-control mt-6 w-fit self-end">
          <button
            className="btn btn-primary text-base-100 normal-case"
            type="submit"
          >
            {isAdmin ? "Create Room" : "Join Room"}
          </button>
        </div>
      </form>
    </>
  );
}
