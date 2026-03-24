"use client";

import { FaRegHandshake } from "react-icons/fa";
import StatusActionButton from "../utilityComponents/StatusActionButton";
import type { Request } from "@/app/types/request";

type Props = {
  request: Request;
  setRequests: React.Dispatch<React.SetStateAction<Request[]>>;
};

const SetStatus = ({ request, setRequests }: Props) => {
  const updateStatus = (newStatus: Request["status"]) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === request.id ? { ...r, status: newStatus } : r)),
    );
  };

  const handleApprove = () => {
    updateStatus("Godkendt");
  };

  const handleReject = () => {
    updateStatus("Afslået");
  };

  return (
    <div className="grid items-center [&>*]:mx-auto gap-8 pb-8">
      <FaRegHandshake className="text-[90px]" />

      <div className="flex gap-2">
        <h1 className="font-semibold text-[36px]!">Status:</h1>

        <h1
          className={`font-semibold text-[36px]!
            ${request.status === "Godkendt" && "text-green-500"}
            ${request.status === "Afslået" && "text-red-500"}
            ${request.status === "Afventer" && "text-blue-500"}
          `}
        >
          {request.status}
        </h1>
      </div>

      <div className="flex gap-8 mt-6">
        <StatusActionButton
          type="godkend"
          onClick={handleApprove}
          disabled={
            request.status !== "Afventer" && request.status !== "Behandles"
          }
          request={request}
        />

        <StatusActionButton
          type="afslå"
          onClick={handleReject}
          disabled={
            request.status !== "Afventer" && request.status !== "Behandles"
          }
          request={request}
        />
      </div>
    </div>
  );
};

export default SetStatus;
