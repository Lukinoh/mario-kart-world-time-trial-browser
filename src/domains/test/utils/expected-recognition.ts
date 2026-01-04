import { Coins } from "../../recognition/coins/coins";
import { Lap } from "../../recognition/lap/lap";
import { Laps } from "../../recognition/laps/laps";
import { Pause } from "../../recognition/pause/pause";
import type { RecognitionAnalysis } from "../types/recognition-analysis";
import { Shrooms } from "../../recognition/shrooms/shrooms";
import { Time } from "../../recognition/time/time";
import { Track } from "../../recognition/track/track";
import { assert } from "../../_core/utils/assert";
import { expect } from "vitest";
import { loadImages } from "../../image-manipulation/image/image-loader";

const BgYellow = "\u001B[43m";
const FgBlack = "\u001B[30m";
const Reset = "\u001B[0m";

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
