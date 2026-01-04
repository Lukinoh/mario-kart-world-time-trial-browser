import { css } from "@emotion/css";
import { defineComponent } from "../domains/_core/utils/solid-js";

const sInput = css({
  marginBottom: 0,
});

interface TextInput {
  label: string;
  value: string;
  placeholder?: string;
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
        placeholder={props.placeholder}
        onInput={(event) => {
          props.setValue(event.target.value);
        }}
      />
    </div>
  );
});
