export function hueGrad(h) {
  return `linear-gradient(135deg, oklch(0.56 0.15 ${h}), oklch(0.68 0.15 ${h + 25}))`;
}
export function hueSolid(h) {
  return `oklch(0.5 0.14 ${h})`;
}
export function hueTint(h) {
  return `oklch(0.95 0.025 ${h})`;
}
export function hueTintText(h) {
  return `oklch(0.4 0.09 ${h})`;
}

// Default (terracotta) accent palette from the design.
export const ACCENT_A = '#C1583D';
export const ACCENT_B = '#DA8A4E';
export const ACCENT_GRAD = `linear-gradient(135deg, ${ACCENT_A}, ${ACCENT_B})`;
export const ACCENT_SOLID = ACCENT_A;
export const ACCENT_TINT = `color-mix(in oklch, ${ACCENT_A} 10%, white)`;
export const ACCENT_TINT_BORDER = `color-mix(in oklch, ${ACCENT_A} 55%, white)`;
