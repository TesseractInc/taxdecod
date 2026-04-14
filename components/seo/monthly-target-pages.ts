import { solveGrossForTargetMonthlyNet } from "./reverse-pages";

export function getMonthlyTakeHomeAmounts() {
  const amounts: number[] = [];

  for (let value = 1200; value <= 3000; value += 100) amounts.push(value);
  for (let value = 3200; value <= 5000; value += 200) amounts.push(value);
  for (let value = 5500; value <= 8000; value += 500) amounts.push(value);

  return amounts;
}

export function getMonthlyTakeHomeParams() {
  return getMonthlyTakeHomeAmounts().map((amount) => ({
    amount: String(amount),
  }));
}

export function parseMonthlyTakeHomeAmount(value: string) {
  const amount = Number(value);
  if (!Number.isFinite(amount) || amount < 500 || amount > 20000) return null;
  return amount;
}

export function getMonthlyTakeHomePageData(amount: number) {
  return solveGrossForTargetMonthlyNet(amount);
}