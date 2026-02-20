"use client";

import type { Request } from "../RequestContent";
import { FaBookmark } from "react-icons/fa6";
import { useState } from "react";
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
  return (
    <div
      onClick={() => setSelectedId(request.id)}
      className={`
        cursor-pointer transition-all duration-200 ease-in shrink-0
        grid grid-cols-[minmax(0,260px)_minmax(0,175px)_minmax(0,150px)_minmax(0,150px)_1fr] h-[48] items-center border-b border-gray-200
        hover:bg-(--light-prime)/5
        ${isSelected ? "bg-(--light-prime)/10" : ""}
      `}
    >
      <div className="flex pl-3 gap-3 items-center">
        <FaBookmark
          onClick={() => setMarked(!marked)}
          className={`transition-all duration-150 ease-in
            text-[15px] ${marked ? "text-(--contrast)" : "hover:text-(--contrast)/70 text-transparent"}`}
        />
        <p className="font-bold truncate">
          {request.name.length > 25
            ? request.name.slice(0, 25) + "..."
            : request.name}
        </p>
      </div>

      <p>{request.amount.toLocaleString("da-DK")} kr.</p>

      <p className="truncate">{request.forWhat}</p>

      <div className="flex items-center gap-2">
        <span className={`h-[8px] w-[8px] rounded-full ${styles.dot}`} />
        <p className={`${styles.text} font-semibold`}>{request.status}</p>
      </div>
    </div>
  );
};

export default RequestItem;
