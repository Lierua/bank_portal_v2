"use client";
import type { Request } from "@/app/types/request";

type Props = {
  type: "godkend" | "afslå" | "behandel";
  onClick: () => void;
  disabled?: boolean;
  request: Request;
};

const StatusActionButton = ({
  type,
  onClick,
  disabled = false,
  request,
}: Props) => {
  const isApprove = type === "godkend";

  const baseStyles =
    " px-4 text-center w-[150px] py-2 rounded-full text-sm transition-all duration-200 ease-in focus:outline-none";

  let activeStyles;

  if (type === "behandel") {
    activeStyles = "bg-yellow-500 text-white hover:bg-yellow-400 ";
  } else {
    activeStyles = isApprove
      ? "bg-[#12C46B] text-white hover:bg-green-400 "
      : "bg-[#C41230] text-white hover:bg-red-500 ";
  }

  const disabledStyles =
    "opacity-50 cursor-not-allowed bg-gray-300 text-gray-600";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${disabled ? disabledStyles : activeStyles}`}
    >
      {type === "behandel" ? "Tilføj" : isApprove ? "Godkend" : "Afslå"}
    </button>
  );
};

export default StatusActionButton;
