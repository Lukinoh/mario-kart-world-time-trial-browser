import { type Component, onMount } from "solid-js";
import { A } from "@solidjs/router";
import { FaqApplication } from "./faq-application";
import { FaqData } from "./faq-data";
import { FaqKnownDetectionProblems } from "./faq-known-detection-problems";
import { FaqMiscellaneous } from "./faq-miscellaneous";
import { FaqObsStudio } from "./faq-obs-studio";
import { FaqSetup } from "./faq-setup";
import type { ViewProps } from "../../domains/_core/utils/solid-js";
import logo from "../../assets/icons/original-no-background-stylized.png";

export const Readme: Component<ViewProps> = (props) => {
  onMount(() => {
    props.setTitle("Readme 🥺");
  });

  return (
    <>
      <aside>
        <img alt="logo" src={logo} />
      </aside>
      <p>
        This project is inspired by an idea of{" "}
        <A target="_blank" href="https://github.com/breadbored/">
          @breadbored
        </A>{" "}
        and its project{" "}
        <A target="_blank" href="https://bread.codes/posts/mario-kart-world-toolkit/">
          Mario Kart World Toolkit
        </A>
        . So I would like to thank him for having opened the path.
      </p>
      <p>
        The concept of this project resolves around two elements. Firstly, the extraction of data from the time trial is
        done using simple image comparisons. Secondly, everything is stored in your browser.
      </p>
      <p>You must have a capture card to use this application that captures video at least at 720p.</p>
      <p>The project is quite big, and I do not plan to add new features.</p>
      <p>
        If you find any bugs, you can try to open an issue{" "}
        <A href="https://github.com/Lukinoh/mario-kart-world-time-trial-browser/issues/new/choose">here</A>.
      </p>

      <p>The application can work fully offline, but be careful with its limitations. More explanations later.</p>
      <A class="button" href="/index.html" download={"mkwttb.html"}>
        Download
      </A>

      <h2>FAQ</h2>

      <FaqSetup />

      <FaqApplication />

      <FaqObsStudio />

      <FaqData />

      <FaqKnownDetectionProblems />

      <FaqMiscellaneous />
    </>
  );
};
