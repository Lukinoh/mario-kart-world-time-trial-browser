import { generateArray } from "../../_core/utils/generate-array";

function computeRate(number: number): number {
  // Create all default values of a native video element of your browser
  if (number < 8) {
    return 0.25 * number;
  }

  // Then increase exponentially
  return 2 ** (number - 7);
}

export function getAvailablePlaybackRates(): Array<number> {
  const video = document.createElement("video");

  let numberOfRates = 11;

  try {
    video.playbackRate = 128;
    numberOfRates = numberOfRates + 3;
  } catch {
    console.info("Your browser does not support more than x16 playback rate.");
  }

  return generateArray(numberOfRates).map((number) => computeRate(number));
}
