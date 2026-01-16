import { isDefined } from "remeda";

/**
 * Only usable with Safari.
 * The window.screen.width returns the number of "screen pixel" of the current window, whereas for other browsers, it would return the total width of your screen...
 * Same for window.screen.height.
 * So by checking the ratio between the two, we can determine a pseudo devicePixelRatio.
 *
 * I was able to find a solution with help of llm.
 */
export function getSafariDevicePixelRatio(): number {
  const widthRatio = window.screen.width / window.innerWidth;
  const heightRatio = window.screen.height / window.innerHeight;
  // We take the min to be the more conservative
  // We round to 2 digits to be more precise as usually zoom has a step of 25%.
  return Number(Math.min(widthRatio, heightRatio).toFixed(2));
}

export function isSafari(): boolean {
  // oxlint-disable-next-line no-unsafe-type-assertion no-unsafe-member-access no-explicit-any
  return isDefined((globalThis as any).safari);
}
