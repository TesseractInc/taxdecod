import { AlertTriangle, CheckCircle2, Sparkles } from "lucide-react";
import type { ToolInsight } from "../../lib/tax/insights";

type ToolInsightPanelProps = {
  title?: string;
  insights: ToolInsight[];
};

function getToneClasses(tone: ToolInsight["tone"]) {
  if (tone === "positive") {
    return {
      wrapper:
        "border-emerald-200 bg-emerald-50/80 dark:border-emerald-900/50 dark:bg-emerald-950/20",
      title: "text-emerald-800 dark:text-emerald-200",
      copy: "text-emerald-700 dark:text-emerald-300",
      icon: CheckCircle2,
      iconClass: "text-emerald-600 dark:text-emerald-300",
    };
  }

  if (tone === "warning") {
    return {
      wrapper:
        "border-amber-200 bg-amber-50/80 dark:border-amber-900/50 dark:bg-amber-950/20",
      title: "text-amber-800 dark:text-amber-200",
      copy: "text-amber-700 dark:text-amber-300",
      icon: AlertTriangle,
      iconClass: "text-amber-600 dark:text-amber-300",
    };
  }

  return {
    wrapper:
      "border-slate-200 bg-slate-50/80 dark:border-slate-800 dark:bg-slate-900/72",
    title: "text-slate-900 dark:text-slate-100",
    copy: "text-slate-600 dark:text-slate-400",
    icon: Sparkles,
    iconClass: "text-sky-600 dark:text-sky-400",
  };
}

export default function ToolInsightPanel({
  title = "Decision insights",
  insights,
}: ToolInsightPanelProps) {
  if (!insights.length) return null;

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
        {title}
      </p>

      <div className="mt-4 space-y-3">
        {insights.map((item) => {
          const tone = getToneClasses(item.tone);
          const Icon = tone.icon;

          return (
            <div
              key={`${item.title}-${item.description}`}
              className={`rounded-[22px] border px-4 py-4 ${tone.wrapper}`}
            >
              <div className="flex items-start gap-3">
                <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${tone.iconClass}`} />
                <div>
                  <p className={`text-sm font-semibold ${tone.title}`}>
                    {item.title}
                  </p>
                  <p className={`mt-2 text-sm leading-7 ${tone.copy}`}>
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}