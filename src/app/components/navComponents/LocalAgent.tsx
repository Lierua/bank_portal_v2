"use client";

import { useState } from "react";
import type { SearchAgent } from "@/app/types/filial";
import InputFilter from "../utilityComponents/InputFilter";
import DummyFilterSettings from "./DummyFilterSettings";

type Props = {
  show: string;
  addLocalAgent: (agent: SearchAgent) => void;
};

export default function LocalAgent({ show, addLocalAgent }: Props) {
  const [name, setName] = useState("");

  function handleCreate() {
    if (!name.trim()) return;

    const agent: SearchAgent = {
      id: Date.now(),
      name,
      filters: {},
      location: {
        regions: [],
        kommuner: [],
        postcodes: [],
      },
    };

    addLocalAgent(agent);
    setName("");
  }

  return (
    <div
      className={`
        grid grid-cols-[70px_1fr]
        overflow-hidden transition-all duration-300
        ${show == "add" ? "max-h-[800]" : "max-h-0"}
      `}
    >
      <div className="bg-(--prime) rounded-bl-lg" />
      <div className="pb-5 px-5 pt-4 space-y-4 overflow-y-auto">
        <Section title="Local søgeagenter">
          <div className="text-[20px]! [&>*]:h-[50] max-w-[500] mt-2">
            <InputFilter
              dataInput="agentName"
              type="text"
              placeholder="Indtast navn"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <DummyFilterSettings />
          <button
            onClick={handleCreate}
            className="w-fit px-4 py-2 rounded-md bg-(--contrast) text-white"
          >
            Opret agent
          </button>
        </Section>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <h2 className="text-2xl font-semibold!">{title}</h2>
      <div className="grid gap-6">{children}</div>
    </div>
  );
}
