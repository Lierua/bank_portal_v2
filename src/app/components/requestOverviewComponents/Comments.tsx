"use client";

import { useState, useRef, useEffect } from "react";
import ButtonOne from "../utilityComponents/ButtonOne";

/* -------------------------
   Mock Comments
-------------------------- */
const initialComments = [
  {
    id: 1,
    author: "Line Christiansen",
    message: "Mangler dokumentation for indkomst.",
    createdAt: "2 timer siden",
  },
  {
    id: 2,
    author: "Anders Rasmussen",
    message: "Ser fornuftig ud ift. gældsfaktor.",
    createdAt: "I går",
  },

  {
    id: 3,
    author: "Mads Karllade",
    message: "Mangler x, y, c, z",
    createdAt: "I går",
  },
];

type Props = {
  large: boolean;
};

const Comments = ({ large }: Props) => {
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState(initialComments);
  const [inputValue, setInputValue] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  /* -------------------------
     Close on outside click
  -------------------------- */
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* -------------------------
     Submit Comment
  -------------------------- */
  const handleSubmit = () => {
    if (!inputValue.trim()) return;

    const newComment = {
      id: Date.now(),
      author: "Dig", // mock current user
      message: inputValue,
      createdAt: "Lige nu",
    };

    setComments((prev) => [newComment, ...prev]);
    setInputValue("");
  };

  return (
    <div ref={containerRef} className="transition-all duration-200 ease-in">
      <div
        className={`
          top-[30px]
          ${large ? "max-w-full" : "w-[406px]"} bg-white border-2 border-black/20
          rounded-xl z-20 flex flex-col
          animate-fade-in
        `}
      >
        {/* Comment List */}
        <div
          className={`${large ? "max-h-[300px]" : "max-h-[190px]"}  overflow-y-auto shrink-0`}
        >
          {comments.map((c, index) => (
            <div key={c.id}>
              <div
                className="px-4 py-2 flex flex-col gap-1 shrink-0
               transition-all duration-200 ease-in hover:bg-blue-100"
              >
                <div className="flex gap-8 text-sm">
                  <span className="font-semibold text-(--black)">
                    {c.author}
                  </span>
                  <span className="text-[12px] pt-[2] text-(--black)/60">
                    {c.createdAt}
                  </span>
                </div>

                <p className="text-(--black)/60!">{c.message}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Section */}
        <div className="border-t border-black/20 p-3 flex gap-2 items-center">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ansøgnings note..."
            type="text"
            className="flex-1  rounded-md px-3 py-2 text-sm focus:outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit();
            }}
          />

          <div className="[&>*]:py-2 ">
            <ButtonOne type="submit" label="arrow" onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
