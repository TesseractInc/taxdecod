export type SavedScenarioType = "calculator" | "reverse" | "compare";

export type SavedScenario = {
  id: string;
  type: SavedScenarioType;
  createdAt: number;
  updatedAt: number;
  title: string;
  subtitle: string;
  payload: Record<string, unknown>;
};

function getScopedStorageKey(userScope?: string | null) {
  const normalized = userScope?.trim() || "guest";
  return `taxdecod_saved_scenarios_${normalized}`;
}

export function getSavedScenarios(userScope?: string | null): SavedScenario[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(getScopedStorageKey(userScope));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SavedScenario[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveScenario(
  scenario: SavedScenario,
  userScope?: string | null
) {
  if (typeof window === "undefined") return;

  const existing = getSavedScenarios(userScope);
  const next = [
    scenario,
    ...existing.filter((item) => item.id !== scenario.id),
  ].slice(0, 12);

  window.localStorage.setItem(
    getScopedStorageKey(userScope),
    JSON.stringify(next)
  );
}

export function removeScenario(id: string, userScope?: string | null) {
  if (typeof window === "undefined") return;

  const existing = getSavedScenarios(userScope);
  const next = existing.filter((item) => item.id !== id);

  window.localStorage.setItem(
    getScopedStorageKey(userScope),
    JSON.stringify(next)
  );
}

export function saveLastScenario(
  type: SavedScenarioType,
  payload: Record<string, unknown>,
  userScope?: string | null
) {
  if (typeof window === "undefined") return;

  const key = `taxdecod_last_${type}_${userScope?.trim() || "guest"}`;
  window.localStorage.setItem(
    key,
    JSON.stringify({
      type,
      payload,
      updatedAt: Date.now(),
    })
  );
}

export function getLastScenario<T extends Record<string, unknown>>(
  type: SavedScenarioType,
  userScope?: string | null
): T | null {
  if (typeof window === "undefined") return null;

  try {
    const key = `taxdecod_last_${type}_${userScope?.trim() || "guest"}`;
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as {
      payload?: T;
    };

    return parsed?.payload ?? null;
  } catch {
    return null;
  }
}

export function createScenarioId(type: SavedScenarioType) {
  return `${type}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}