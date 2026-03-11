"use client";

import StatusActionButton from "../utilityComponents/StatusActionButton";
import type { Request } from "@/app/types/request";

type Props = {
  request: Request;
  setRequests: React.Dispatch<React.SetStateAction<Request[]>>;
  toggleFlag: (id: number) => void;
};

const SetSideStatus = ({ request, setRequests, toggleFlag }: Props) => {
  const updateStatus = (newStatus: Request["status"]) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === request.id ? { ...r, status: newStatus } : r)),
    );
  };

  return (
    <div className="flex gap-8 justify-center mt-4 pb-4 [&>*]:w-full!">
      <StatusActionButton
        type="behandel"
        onClick={() => toggleFlag(request.id)}
        disabled={
          request.status !== "Afventer" && request.status !== "Behandles"
        }
        request={request}
      />

      <StatusActionButton
        type="afslå"
        onClick={() => updateStatus("Afslået")}
        disabled={
          request.status !== "Afventer" && request.status !== "Behandles"
        }
        request={request}
      />
    </div>
  );
};

export default SetSideStatus;
