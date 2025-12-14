import { Coins } from "../recognitions/coins/coins";
import { Lap } from "../recognitions/lap/lap";
import { Laps } from "../recognitions/laps/laps";
import { Pause } from "../recognitions/pause/pause";
import { Shrooms } from "../recognitions/shrooms/shrooms";
import { Time } from "../recognitions/time/time";
import { Track } from "../recognitions/track/track";
import { assert } from "../tools/utils";
import { expect } from "vitest";
import { loadImages } from "../tools/image/image-loader";

const BgYellow = "\u001B[43m";
const FgBlack = "\u001B[30m";
const Reset = "\u001B[0m";

interface RecognitionAnalysis {
  source: Record<string, string>;
  expected: {
    coins: string;
    lap: string;
    laps: string;
    pause: boolean;
    shrooms: string;
    time: string;
    timeYellow: boolean;
    track: string;
  };
}

export async function expectedRecognition(params: RecognitionAnalysis, warnOnTrack: boolean): Promise<void> {
  const images = await loadImages(params.source);
  const imageData = images.at(0)?.value;
  assert(imageData, "No image found");

  expect(Coins.get(imageData)).toStrictEqual(params.expected.coins);
  expect(Lap.get(imageData)).toStrictEqual(params.expected.lap);
  expect(Laps.get(imageData)).toStrictEqual(params.expected.laps);
  expect(Pause.isPause(imageData)).toStrictEqual(params.expected.pause);
  expect(Shrooms.get(imageData)).toStrictEqual(params.expected.shrooms);
  expect(Time.get(imageData)).toStrictEqual(params.expected.time);
  expect(Time.isYellow(imageData)).toStrictEqual(params.expected.timeYellow);

  const track = Track.get(imageData);

  if (warnOnTrack) {
    if (track !== params.expected.track) {
      console.warn(`${FgBlack}${BgYellow}Track${Reset} Expected ${params.expected.track} but got ${track}.`);
    }
  } else {
    expect(track).toStrictEqual(params.expected.track);
  }
}
