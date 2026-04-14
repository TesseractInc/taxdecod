"use client";

import { useEffect, useMemo, useState } from "react";
import { Clock3, Trash2 } from "lucide-react";
import {
  getSavedScenarios,
  removeScenario,
  type SavedScenario,
  type SavedScenarioType,
} from "@/lib/tax/storage/saved-scenarios";
import { useSupabaseAuth } from "../auth/supabase-auth-provider";

type SavedScenariosPanelProps = {
  type: SavedScenarioType;
  title?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  onLoad: (scenario: SavedScenario) => void;
};

function formatTime(timestamp: number) {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(timestamp));
  } catch {
    return "Recently";
  }
}

export default function SavedScenariosPanel({
  type,
  title = "Saved scenarios",
  emptyTitle = "No saved scenarios yet",
  emptyDescription = "Save a route once and it will appear here for quick return access.",
  onLoad,
}: SavedScenariosPanelProps) {
  const { user, email } = useSupabaseAuth();
  const userScope = useMemo(() => user?.id || email || "guest", [user, email]);

  const [items, setItems] = useState<SavedScenario[]>([]);

  useEffect(() => {
    setItems(getSavedScenarios(userScope).filter((item) => item.type === type));
  }, [type, userScope]);

  function refresh() {
    setItems(getSavedScenarios(userScope).filter((item) => item.type === type));
  }

  function handleDelete(id: string) {
    removeScenario(id, userScope);
    refresh();
  }

  if (items.length === 0) {
    return (
      <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
          {title}
        </p>
        <p className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
          {emptyTitle}
        </p>
        <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
          {emptyDescription}
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
        {title}
      </p>

      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-[22px] border border-slate-200 bg-slate-50/80 px-4 py-4 dark:border-slate-800 dark:bg-slate-900/72"
          >
            <div className="flex items-start justify-between gap-3">
              <button
                type="button"
                onClick={() => onLoad(item)}
                className="min-w-0 flex-1 text-left"
              >
                <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {item.title}
                </p>
                <p className="mt-1 text-sm leading-7 text-slate-600 dark:text-slate-400">
                  {item.subtitle}
                </p>
                <div className="mt-2 inline-flex items-center gap-2 text-xs text-slate-500 dark:text-slate-500">
                  <Clock3 className="h-3.5 w-3.5" />
                  {formatTime(item.updatedAt)}
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-rose-200 hover:text-rose-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 dark:hover:border-rose-900 dark:hover:text-rose-400"
                aria-label="Delete saved scenario"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}