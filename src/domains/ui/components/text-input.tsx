import { defineComponent } from "../../_core/utils/solid-js";

interface TextInputProps {
  label: string;
  value: string;
  placeholder?: string;
  onInput: (text: string) => void;
}

export const TextInput = defineComponent<TextInputProps>((props) => {
  return (
    <div>
      <label>{props.label}</label>
      <input
        type="text"
        value={props.value}
        placeholder={props.placeholder}
        onInput={(event) => {
          props.onInput(event.target.value);
        }}
      />
    </div>
  );
});
