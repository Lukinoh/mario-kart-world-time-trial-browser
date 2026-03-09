import { type Component, onMount } from "solid-js";
import { A } from "@solidjs/router";
import { FaqData } from "./faq-data";
import { FaqGeneral } from "./faq-general";
import { FaqKnownDetectionProblems } from "./faq-known-detection-problems";
import { FaqMiscellaneous } from "./faq-miscellaneous";
import { FaqObsStudio } from "./faq-obs-studio";
import { FaqSetup } from "./faq-setup";
import { FaqSourceFile } from "./faq-source-file";
import { Mkwttb } from "../../domains/_core/components/mkwttb";
import logo from "../../assets/icons/original-no-background-stylized.png";
import { usePageTitle } from "../compositions/use-page-title";

export const Readme: Component = () => {
  const { setTitle } = usePageTitle();

  onMount(() => {
    setTitle("Readme 🥺");
  });

  return (
    <>
      <aside>
        <img alt="logo" src={logo} />
      </aside>
      <p>
        <Mkwttb /> allows you to extract information from your <strong>Mario Kart World Time Trial</strong> using your
        capture card and a browser. The extraction of the data is done using simple comparisons of images, and all the
        data is stored in your browser. You must have a capture card that captures video at least 720p.
      </p>
      <p>
        You start the capture, and everything is done automatically.{" "}
        <strong>No manual intervention is required.</strong>
      </p>
      <p>
        <Mkwttb /> provides additional features.
      </p>
      <ul>
        <li>
          Feedback of your time in comparison to your personal best, best personal splits, world records, and friends
        </li>
        <li>Basic integration with OBS Studio</li>
        <li>Ability to extract information from a video</li>
        <li>Full control over the data using export and import feature</li>
      </ul>

      <p>
        If you find a bug or have a suggestion, you can open an issue on{" "}
        <A target="_blank" href="https://github.com/Lukinoh/mario-kart-world-time-trial-browser/issues">
          GitHub
        </A>
        . Currently, I do not know how much effort I am going to put on adding features; however, I will look into bugs.
      </p>

      <p>
        The project was inspired by an idea of{" "}
        <A target="_blank" href="https://github.com/breadbored/">
          @breadbored
        </A>{" "}
        and its project{" "}
        <A target="_blank" href="https://bread.codes/posts/mario-kart-world-toolkit/">
          Mario Kart World Toolkit
        </A>
        . So I would like to thank him for having opened the path.
      </p>

      <h2>FAQ</h2>

      <FaqSetup />

      <FaqGeneral />

      <FaqSourceFile />

      <FaqObsStudio />

      <FaqData />

      <FaqKnownDetectionProblems />

      <FaqMiscellaneous />

      <h2>Offline Mode</h2>

      <p>
        <Mkwttb /> can work fully offline. You can download <code>mkttb.html</code> using the button below, and open it
        with your browser. However, be aware of some limitations.
      </p>
      <ul>
        <li>
          The data is tied to the location where you open <Mkwttb />. If you already have data, and you want to move
          your <code>mkttb.html</code> in another folder, you have to export the data, move the file, and import it
          back.
        </li>
        <li>
          There is a feature that retains the OBS popup position and size. This feature does not work except if you are
          using Firefox.
        </li>
      </ul>

      <a class="button" href="index.html" download="mkwttb.html">
        Download
      </a>

      <h1>Thanks 🥹</h1>
    </>
  );
};
