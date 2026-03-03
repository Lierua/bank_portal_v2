"use client";

import StatusActionButton from "../utilityComponents/StatusActionButton";
import type { Request } from "../RequestContent";

type Props = {
  request: Request;
  setRequests: React.Dispatch<React.SetStateAction<Request[]>>;
};

const SetSideStatus = ({ request, setRequests }: Props) => {
  const updateStatus = (newStatus: Request["status"]) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === request.id ? { ...r, status: newStatus } : r)),
    );
  };

  return (
    <div className="flex gap-8 justify-center mt-4 pb-4 [&>*]:w-full!">
      <StatusActionButton
        type="godkend"
        onClick={() => updateStatus("Godkendt")}
        disabled={
          request.status !== "Ubehandlet" && request.status !== "Behandles"
        }
        request={request}
      />

      <StatusActionButton
        type="afslå"
        onClick={() => updateStatus("Afslået")}
        disabled={
          request.status !== "Ubehandlet" && request.status !== "Behandles"
        }
        request={request}
      />
    </div>
  );
};

export default SetSideStatus;
