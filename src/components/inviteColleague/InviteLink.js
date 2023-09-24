import { writeToClipboard } from "@/lib/utils";
import { useState } from "react";

const InviteLink = ({ link }) => {
  const [showToast, setShowToast] = useState(false);
  const copyUrlToClipboard = async () => {
    writeToClipboard(link);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 1 * 1000);
  };
  return (
    <div>
      <button
        onClick={copyUrlToClipboard}
        className="btn btn-outline btn-primary normal-case rounded-full tracking-wider"
      >
        Invite Colleagues
      </button>
      {showToast ? (
        <div className="toast toast-top toast-end mt-20">
          <div className="alert alert-success bg-green-500 text-gray-900">
            <span>Link Copied</span>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export { InviteLink };
