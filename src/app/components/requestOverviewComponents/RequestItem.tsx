"use client";

import type { Request } from "../RequestContent";
import { FaBookmark } from "react-icons/fa6";
import { useState, useEffect } from "react";

import {
  getOpenedRequests,
  setOpenedRequests,
} from "@/app/components/utilityComponents/cookies";
import { date } from "zod/mini";

type Props = {
  request: Request;
  styles: {
    text: string;
    dot: string;
  };
  selectedId: number | null;
  setSelectedId: React.Dispatch<React.SetStateAction<number | null>>;
};

const RequestItem = ({ request, styles, selectedId, setSelectedId }: Props) => {
  const isSelected = selectedId === request.id;

  const [marked, setMarked] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Load cookie state
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
      className={`
        cursor-pointer transition-all duration-200 ease-in shrink-0 ${hasOpened ? "opacity-90" : "bg-blue-100/50"}
        grid grid-cols-[minmax(0,260px)_minmax(0,185px)_minmax(0,185px)_minmax(0,185px)_1fr_minmax(0,110px)]
        h-[48] items-center border-b border-gray-200
        hover:bg-(--light-prime)/5
        ${isSelected ? "bg-(--light-prime)/10" : ""}
      `}
    >
      <div className="flex pl-3 gap-3 items-center">
        <FaBookmark
          onClick={(e) => {
            e.stopPropagation();
            setMarked(!marked);
          }}
          className={`transition-all duration-150 ease-in text-[15px]
            ${
              marked
                ? "text-(--contrast)"
                : "hover:text-(--contrast)/70 text-transparent"
            }`}
        />

        {/* Example visual indicator */}
        <p className={`font-bold truncate `}>
          {request.name.length > 25
            ? request.name.slice(0, 25) + "..."
            : request.name}
        </p>
      </div>

      <p>{request.amount.toLocaleString("da-DK")} kr.</p>

      <p className="truncate">{request.forWhat}</p>

      <div className="flex items-center gap-2">
        <span className={`h-[8] w-[8] rounded-full ${styles.dot}`} />
        <p className={`${styles.text} font-semibold`}>{request.status}</p>
      </div>

      <p></p>
      <p
        className="text-center"
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

  if (diffDays === 0) return "I dag";
  if (diffDays === 1) return "I går";
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
