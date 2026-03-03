"use client";

import { FaRegHandshake } from "react-icons/fa";
import StatusActionButton from "../utilityComponents/StatusActionButton";
import type { Request } from "../RequestContent";

type Props = {
  request: Request;
  setRequests: React.Dispatch<React.SetStateAction<Request[]>>;
};

const SetSideStatus = ({ request, setRequests }: Props) => {
  const SetSideStatus = (newStatus: Request["status"]) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === request.id ? { ...r, status: newStatus } : r)),
    );
  };

  const handleApprove = () => {
    SetSideStatus("Godkendt");
  };

  const handleReject = () => {
    SetSideStatus("Afslået");
  };

  return (
    <div className="grid items-center [&>*]:mx-auto pb-4">
      <div className="flex gap-8 mt-4">
        <StatusActionButton
          type="godkend"
          onClick={handleApprove}
          disabled={request.status !== "Pending"}
          request={request}
        />

        <StatusActionButton
          type="afslå"
          onClick={handleReject}
          disabled={request.status !== "Pending"}
          request={request}
        />
      </div>
    </div>
  );
};

export default SetSideStatus;
