import { assert, defineComponent } from "./tools/utils";
import { EnhancedImageData } from "./tools/image/enhanced-image-data";
import { getVideoStream } from "./tools/video/video-stream";
import { onMount } from "solid-js";
import { useResources } from "./stores/use-resources";
import videoSrc from "./assets/sources/demo.webm";

const MODE = "WEBM";

export const App = defineComponent(() => {
  const videoElement = document.createElement("video");
  const canvasElement = document.createElement("canvas");
  const context = canvasElement.getContext("2d");
  assert(context, "Context is null");

  const { state, update } = useResources();

  // oxlint-disable-next-line no-misused-promises
  onMount(async (): Promise<void> => {
    videoElement.controls = true;

    if (MODE === "WEBM") {
      videoElement.src = videoSrc;
    } else {
      videoElement.srcObject = await getVideoStream();
    }

    videoElement.addEventListener("play", () => {
      canvasElement.width = videoElement.videoWidth;
      canvasElement.height = videoElement.videoHeight;
    });

    videoElement.addEventListener("timeupdate", () => {
      processFrame();
    });
  });

  const processFrame = (): void => {
    context.drawImage(videoElement, 0, 0);
    const start = performance.now();
    const image = EnhancedImageData.from(context.getImageData(0, 0, videoElement.videoWidth, videoElement.videoHeight));
    update(image, context);
    const end = performance.now() - start;
    console.info(`Total Time ${end}`);
  };

  return (
    <>
      <h1>Current Lap: {state.lap.current}</h1>
      <h1>Total Laps: {state.lap.total}</h1>
      <h1>Time: {state.time}</h1>
      <h1>Shrooms: {state.shrooms}</h1>
      <h1>Coins: {state.coins}</h1>
      <h1>Maps: {state.map}</h1>
      {videoElement}
      {canvasElement}
    </>
  );
});
