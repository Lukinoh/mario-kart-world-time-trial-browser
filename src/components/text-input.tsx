import { css } from "@emotion/css";
import { defineComponent } from "../core/helpers/solid-js";

const sInput = css({
  marginBottom: 0,
});

interface TextInput {
  label: string;
  value: string;
  setValue: (text: string) => void;
}

export const TextInput = defineComponent<TextInput>((props) => {
  return (
    <div>
      <label>Player:</label>
      <input
        class={sInput}
        type="text"
        value={props.value}
        onInput={(event) => {
          props.setValue(event.target.value);
        }}
      />
    </div>
  );
});
