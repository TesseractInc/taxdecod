"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
};

export default function CountUp({
  end,
  duration = 1400,
  prefix = "",
  suffix = "",
}: CountUpProps) {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    let frame = 0;
    const totalFrames = Math.max(24, Math.round(duration / 16));

    const tick = () => {
      frame += 1;
      const progress = frame / totalFrames;
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = Math.round(end * eased);

      setValue(next);

      if (frame < totalFrames) {
        requestAnimationFrame(tick);
      } else {
        setValue(end);
      }
    };

    requestAnimationFrame(tick);
  }, [end, duration]);

  return (
    <span>
      {prefix}
      {value.toLocaleString("en-GB")}
      {suffix}
    </span>
  );
}