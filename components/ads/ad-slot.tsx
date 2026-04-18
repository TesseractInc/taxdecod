"use client";

import { useEffect } from "react";

type AdSlotProps = {
  label?: string;
  minHeight?: number;
};

export default function AdSlot({
  label = "Advertisement",
  minHeight = 120,
}: AdSlotProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // ignore until AdSense is configured
    }
  }, []);

  return (
    <section className="my-10" aria-label={label}>
      <div className="mb-3 text-center text-[11px] uppercase tracking-[0.16em] app-subtle">
        {label}
      </div>

      <div
        className="overflow-hidden rounded-[22px] border"
        style={{
          borderColor: "var(--line)",
          background:
            "linear-gradient(180deg, color-mix(in srgb, var(--surface-2) 96%, white 4%), var(--surface-2))",
          minHeight,
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <ins
          className="adsbygoogle"
          style={{
            display: "block",
            width: "100%",
            minHeight,
          }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot="1234567890"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />

      </div>
    </section>
  );
}