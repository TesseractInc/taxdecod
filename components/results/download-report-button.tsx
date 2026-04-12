"use client";

import { useState } from "react";
import { Download } from "lucide-react";

type CalculatorInput = Record<string, unknown>;
type TakeHomeResult = Record<string, unknown>;

export type DownloadReportButtonProps = {
  values: CalculatorInput;
  result: TakeHomeResult;
  filename?: string;
  label?: string;
  fullWidth?: boolean;
  className?: string;
};

export default function DownloadReportButton({
  values,
  result,
  filename = "taxdecod-report.pdf",
  label = "Download report",
  fullWidth = false,
  className = "",
}: DownloadReportButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);

      // Keep your real PDF generation logic here if you already have it.
      // This placeholder keeps the component type-safe and build-safe.
      // Replace this block only if you already have working PDF logic elsewhere.
      const payload = {
        values,
        result,
        generatedAt: new Date().toISOString(),
      };

      const blob = new Blob([JSON.stringify(payload, null, 2)], {
        type: "application/json",
      });

      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = filename.endsWith(".pdf") ? filename : `${filename}.pdf`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={isDownloading}
      className={[
        "app-button-primary",
        fullWidth ? "w-full" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Download className="h-4 w-4" />
      {isDownloading ? "Preparing..." : label}
    </button>
  );
}