export interface SolarEstimate {
  recommendedKw: number;
  actualDcKw: number;
  panelCount: number;
  panelWattage: number;
  requiredAreaSqft: number;
  monthlyUnits: number;
  annualUnits: number;
  monthlySavingsPkr: number;
  annualSavingsPkr: number;
  lifetimeSavingsPkr: number;
  estimatedCostPkr: number;
  paybackYears: number;
  co2OffsetTonnes: number;
  treesPlanted: number;
  netMeteringEligible: boolean;
}

const STANDARD_CAPACITIES = [3.0, 5.0, 6.0, 8.0, 10.0, 12.0, 15.0, 20.0, 25.0, 30.0, 40.0, 50.0, 60.0, 80.0, 100.0, 150.0, 250.0, 500.0];
const PANEL_WATTAGE = 585;
const AREA_PER_KW = 70;
const MONTHLY_UNITS_PER_KW = 125;

export function calculateInstantSolar(
  billAmount: number,
  ratePerUnit: number = 58.0,
  isHybrid: boolean = false
): SolarEstimate {
  const units = billAmount / ratePerUnit;
  const rawKw = units / MONTHLY_UNITS_PER_KW;

  let recommendedKw = STANDARD_CAPACITIES[0];
  for (const cap of STANDARD_CAPACITIES) {
    if (cap >= rawKw * 0.95) {
      recommendedKw = cap;
      break;
    }
    recommendedKw = cap;
  }

  if (rawKw > STANDARD_CAPACITIES[STANDARD_CAPACITIES.length - 1]) {
    recommendedKw = Math.ceil(rawKw / 25) * 25;
  }

  const totalWatts = recommendedKw * 1000;
  const panelCount = Math.ceil(totalWatts / PANEL_WATTAGE);
  const actualDcKw = Number(((panelCount * PANEL_WATTAGE) / 1000).toFixed(2));
  const requiredAreaSqft = Math.round(recommendedKw * AREA_PER_KW);

  const monthlyUnits = Math.round(recommendedKw * MONTHLY_UNITS_PER_KW);
  const annualUnits = monthlyUnits * 12;

  const monthlySavingsPkr = Math.min(billAmount, Math.round(monthlyUnits * ratePerUnit));
  const annualSavingsPkr = monthlySavingsPkr * 12;

  // 25 year lifetime savings
  let lifetimeSavingsPkr = 0;
  let currentRate = ratePerUnit;
  let currentGen = annualUnits;
  for (let yr = 1; yr <= 25; yr++) {
    lifetimeSavingsPkr += currentGen * currentRate;
    currentRate *= 1.05;
    currentGen *= 0.995;
  }

  const costPerKw = isHybrid ? 155000 : 115000;
  const estimatedCostPkr = recommendedKw * costPerKw;
  const paybackYears = Number((estimatedCostPkr / (annualSavingsPkr || 1)).toFixed(1));

  const co2OffsetTonnes = Number(((annualUnits * 0.82) / 1000).toFixed(2));
  const treesPlanted = Math.round((co2OffsetTonnes * 1000) / 21.77);

  return {
    recommendedKw,
    actualDcKw,
    panelCount,
    panelWattage: PANEL_WATTAGE,
    requiredAreaSqft,
    monthlyUnits,
    annualUnits,
    monthlySavingsPkr,
    annualSavingsPkr,
    lifetimeSavingsPkr: Math.round(lifetimeSavingsPkr),
    estimatedCostPkr,
    paybackYears: paybackYears > 0 ? paybackYears : 2.5,
    co2OffsetTonnes,
    treesPlanted,
    netMeteringEligible: recommendedKw >= 3.0
  };
}
