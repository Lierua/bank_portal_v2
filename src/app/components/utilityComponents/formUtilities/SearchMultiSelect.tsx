"use client";

import { useState, useRef, useEffect, useMemo } from "react";

type Option = {
  value: string;
  label: string;
};

type Props = {
  options: Option[];
  value: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
};

export default function SearchableMultiSelect({
  options,
  value,
  onChange,
  placeholder = "Søg...",
}: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const ref = useRef<HTMLDivElement>(null);

  function toggle(val: string) {
    if (value.includes(val)) {
      onChange(value.filter((v) => v !== val));
    } else {
      onChange([...value, val]);
    }
  }

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();

    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, search]);

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <div
        onClick={() => setOpen((p) => !p)}
        className="border border-black/20 rounded-md p-2 min-h-[44] flex flex-wrap gap-2 cursor-pointer"
      >
        {value.length === 0 && (
          <span className="text-black/40">{placeholder}</span>
        )}

        {value.map((v) => {
          const opt = options.find((o) => o.value === v);

          return (
            <div
              key={v}
              className="bg-(--contrast)/10 text-(--contrast) px-2 py-1 rounded flex items-center gap-2"
            >
              {opt?.label}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  toggle(v);
                }}
                className="cursor-pointer"
              >
                ✕
              </span>
            </div>
          );
        })}
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-20 mt-2 w-full bg-white border border-black/20 rounded-md shadow">
          {/* SEARCH */}
          <div className="p-2 border-b">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Søg postnummer eller by..."
              className="w-full border border-black/20 rounded px-2 py-1 outline-none"
            />
          </div>

          {/* OPTIONS */}
          <div className="max-h-60 overflow-auto">
            {filtered.map((opt) => {
              const checked = value.includes(opt.value);

              return (
                <div
                  key={opt.value}
                  onClick={() => toggle(opt.value)}
                  className="flex items-center gap-3 px-3 py-2 hover:bg-black/5 cursor-pointer"
                >
                  <div
                    className={`w-4 h-4 border rounded flex items-center justify-center ${
                      checked ? "bg-(--contrast) border-(--contrast)" : ""
                    }`}
                  >
                    {checked && <div className="w-2 h-2 bg-white rounded-sm" />}
                  </div>

                  {opt.label}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
