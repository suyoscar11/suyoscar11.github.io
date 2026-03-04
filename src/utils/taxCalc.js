// 2024 US Tax Calculations — Single Filer
export const STANDARD_DEDUCTION = 14600

export function calcTax(gross) {
  if (!gross || gross <= 0) return { federal: 0, fica: 0, state: 0, total: 0, net: 0, taxable: 0, effectiveRate: 0 }
  const taxable = Math.max(0, gross - STANDARD_DEDUCTION)

  // Federal brackets (2024 single)
  let federal = 0
  if      (taxable <= 11600)  federal = taxable * 0.10
  else if (taxable <= 47150)  federal = 1160   + (taxable - 11600)  * 0.12
  else if (taxable <= 100525) federal = 5426   + (taxable - 47150)  * 0.22
  else                        federal = 17168.5 + (taxable - 100525) * 0.24

  const fica  = gross   * 0.0765   // Social Security 6.2% + Medicare 1.45%
  const state = taxable * 0.05     // Average state income tax ~5%
  const total = federal + fica + state

  return {
    federal:       Math.round(federal),
    fica:          Math.round(fica),
    state:         Math.round(state),
    total:         Math.round(total),
    net:           Math.round(gross - total),
    taxable:       Math.round(taxable),
    effectiveRate: Math.round((total / gross) * 100),
  }
}

export function getWeeklySpendable(weeklyPay) {
  return Math.round(weeklyPay * 0.75)
}
