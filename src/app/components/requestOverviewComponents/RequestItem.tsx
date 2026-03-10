"use client";

import type { Request } from "../RequestContent";
import { FaBookmark } from "react-icons/fa6";
import { useState, useEffect } from "react";
import {
  getOpenedRequests,
  setOpenedRequests,
} from "@/app/components/utilityComponents/cookies";

import { createClient } from "@/app/components/utilityComponents/supabase/client";
import { useUser } from "@/app/hooks/useUser";

type Props = {
  request: Request;
  styles: {
    text: string;
    dot: string;
  };
  selectedId: number | null;
  setSelectedId: React.Dispatch<React.SetStateAction<number | null>>;
  toggleFlag: (id: number) => void;
};

const RequestItem = ({
  request,
  styles,
  selectedId,
  setSelectedId,
  toggleFlag,
}: Props) => {
  const { profile } = useUser();
  const isSelected = selectedId === request.id;
  const isMine = request.flagged === profile?.id;

  const isTakenByOther =
    request.flagged !== null && request.flagged !== profile?.id;

  const [hasOpened, setHasOpened] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const opened = getOpenedRequests();
    setHasOpened(opened.includes(request.id));
  }, [request.id]);

  const handleOpen = () => {
    setSelectedId(request.id);

    if (!hasOpened) {
      const opened = getOpenedRequests();
      const updated = [...opened, request.id];
      setOpenedRequests(updated);
      setHasOpened(true);
    }
  };

  return (
    <div
      onClick={handleOpen}
      className={`cursor-pointer transition-all duration-200 ease-in shrink-0
        transition-all duration-200 ease-in hover:bg-blue-100 hover:border-blue-100
        ${hasOpened ? "opacity-80" : "bg-blue-100/50"}
        ${isSelected ? "bg-blue-200/70 border-blue-200/70" : ""}
        ${isTakenByOther ? "opacity-50" : ""}
        grid grid-cols-[40px_minmax(0,220px)_minmax(0,175px)_minmax(0,175px)_minmax(0,175px)_minmax(0,175px)_1fr_minmax(0,110px)]
        h-[48] items-center border-b border-gray-200`}
    >
      <div className="grid">
        {!isTakenByOther && (
          <FaBookmark
            onClick={(e) => {
              e.stopPropagation();
              toggleFlag(request.id);
            }}
            className={`mx-auto text-[15px] transition-all duration-150
              ${
                isMine
                  ? "text-(--contrast)"
                  : "text-transparent hover:text-(--contrast)/70"
              }`}
          />
        )}
      </div>

      <p className="font-bold truncate pr-1 text-(--black)!">{request.name}</p>
      <p>{request.amount.toLocaleString("da-DK")} kr.</p>
      <p className="truncate">{request.forWhat}</p>

      <div className="flex items-center gap-2">
        <span className={`h-[8] w-[8] rounded-full ${styles.dot}`} />
        <p className={`${styles.text} font-semibold`}>{request.status}</p>
      </div>

      <p className="truncate pr-1">{request.handlerName ?? ""}</p>
      <p></p>

      <p
        className="text-center mx-auto"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {request.budget &&
          (hovered
            ? new Date(request.budget.createdAt).toLocaleString("da-DK", {
                day: "numeric",
                month: "short",
              })
            : getDate(request.budget.createdAt))}
      </p>
    </div>
  );
};

export default RequestItem;

export function getDate(dateString?: string) {
  if (!dateString) return "";

  const created = new Date(dateString);
  const now = new Date();

  const diffMs = now.getTime() - created.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0)
    return (
      <div className="flex gap-4 items-center">
        <span className="h-[8] w-[8] rounded-full bg-blue-400"></span>
        <p>I dag</p>
      </div>
    );
  if (diffDays === 1)
    return (
      <div className="flex gap-4 items-center">
        <span className="h-[8] w-[8] rounded-full bg-blue-400"></span>
        <p>I går</p>
      </div>
    );
  if (diffDays < 7) return `${diffDays} dage siden`;

  const weeks = Math.floor(diffDays / 7);
  if (weeks === 1) return "1 uge siden";
  if (weeks < 5) return `${weeks} uger siden`;

  const months = Math.floor(diffDays / 30);
  if (months === 1) return "1 måned siden";
  if (months < 12) return `${months} måneder siden`;

  const years = Math.floor(diffDays / 365);
  return years === 1 ? "1 år siden" : `${years} år siden`;
}
