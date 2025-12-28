import { defineComponent } from "../core/helpers/solid-js";

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
        type="text"
        value={props.value}
        onInput={(event) => {
          props.setValue(event.target.value);
        }}
      />
    </div>
  );
});
