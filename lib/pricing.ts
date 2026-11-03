// Display-only estimate. The LKR amount remains the package price.
export const LKR_PER_USD_ESTIMATE = 330;

export function approximateUsd(lkr: number): string {
  const rounded = Math.max(10, Math.round(lkr / LKR_PER_USD_ESTIMATE / 10) * 10);
  return `$${rounded.toLocaleString('en-US')}`;
}
