"use client";

import { useState } from "react";
import GetInTouchForm, { type Screen } from "@/components/site/GetInTouchForm";

export default function GetInTouchFormCard({
  entryPoint = "inline-card",
}: {
  entryPoint?: string;
}) {
  const [screen, setScreen] = useState<Screen>(1);

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="flex gap-1.5 px-6 pb-5">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className={`h-0.5 flex-1 rounded-full transition-colors duration-300 ${
              screen >= n ? "bg-black/80" : "bg-black/15"
            }`}
          />
        ))}
      </div>
      <GetInTouchForm onScreenChange={setScreen} entryPoint={entryPoint} />
    </div>
  );
}
