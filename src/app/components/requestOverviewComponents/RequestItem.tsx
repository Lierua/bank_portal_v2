"use client";

import type { Request } from "../RequestContent";
import { FaBookmark } from "react-icons/fa6";
import { useState, useEffect } from "react";

import {
  getOpenedRequests,
  setOpenedRequests,
} from "@/app/components/utilityComponents/cookies";

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
        grid grid-cols-[minmax(0,260px)_minmax(0,185px)_minmax(0,185px)_minmax(0,185px)_1fr_minmax(0,100px)]
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
      <p className="text-center">feb. 1</p>
    </div>
  );
};

export default RequestItem;
