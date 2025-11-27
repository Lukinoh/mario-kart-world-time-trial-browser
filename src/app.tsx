import { EnhancedImageData } from "./tools/image/enhanced-image-data";
import { LiveDataTable } from "./components/live-data-table";
import { defineComponent } from "./tools/utils";
import { onMount } from "solid-js";
import { useResources } from "./stores/use-resources";
import { useVideoCanvas } from "./tools/video/video-canvas";

export const App = defineComponent(() => {
  const { redraw, getImageData, putImageData, onTimeUpdate, videoElement, canvasElement } = useVideoCanvas("DEBUG");
  const { state, update } = useResources();

  onMount(() => {
    onTimeUpdate(() => {
      const start = performance.now();
      processFrame();
      const end = performance.now() - start;
      console.info(`Time spend to process a frame: ${end}`);
    });
  });

  const processFrame = (): void => {
    redraw();
    const image = EnhancedImageData.from(getImageData());
    update(image, putImageData);

    // Implement GameState logic
  };

  return (
    <>
      <h1>Live Data</h1>
      <LiveDataTable state={state} />
      <h1>Debug</h1>
      <article>
        {videoElement}
        {canvasElement}
      </article>
    </>
  );
});
