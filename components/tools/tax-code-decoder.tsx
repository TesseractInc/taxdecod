"use client";

import { useState } from "react";
import ToolInsightPanel from "../shared/tool-insight-panel";

function decodeTaxCode(code: string) {
  const clean = code.toUpperCase().trim();

  const number = parseInt(clean.replace(/[^\d]/g, "")) || 0;
  const letters = clean.replace(/\d/g, "");

  let explanation = "";
  let allowance = number * 10;

  if (letters.includes("L")) {
    explanation = "Standard tax-free personal allowance.";
  } else if (letters.includes("BR")) {
    explanation = "All income taxed at basic rate (20%).";
  } else if (letters.includes("D0")) {
    explanation = "All income taxed at higher rate (40%).";
  } else if (letters.includes("D1")) {
    explanation = "All income taxed at additional rate (45%).";
  } else if (letters.includes("K")) {
    explanation =
      "You have additional taxable income or owe tax from previous periods.";
  } else {
    explanation = "Custom or adjusted tax code.";
  }

  return {
    allowance,
    explanation,
    letters,
  };
}

export default function TaxCodeDecoder() {
  const [code, setCode] = useState("1257L");

  const result = decodeTaxCode(code);

  const insights = [
    {
      title: "Your tax-free allowance",
      description: `This code suggests you can earn £${result.allowance.toLocaleString()} before tax.`,
      tone: "neutral" as const,
    },
    {
      title: "What this code means",
      description: result.explanation,
      tone: "neutral" as const,
    },
  ];

  return (
    <div className="space-y-8">

      <div className="rounded-[32px] border p-6">
        <label className="text-sm font-medium">Enter tax code</label>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="mt-2 w-full rounded-lg border px-4 py-3"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">

        <div className="p-5 border rounded-xl">
          <p className="text-sm text-slate-500">Tax-free allowance</p>
          <p className="text-xl font-semibold">
            £{result.allowance.toLocaleString()}
          </p>
        </div>

        <div className="p-5 border rounded-xl">
          <p className="text-sm text-slate-500">Code meaning</p>
          <p className="text-xl font-semibold">
            {result.explanation}
          </p>
        </div>

      </div>

      <ToolInsightPanel insights={insights} />

    </div>
  );
}