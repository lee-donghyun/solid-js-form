import { JSX } from "solid-js";
import { TextFieldRoot, TextField } from "./base/textfield";
import { ErrorMessage } from "./error-message";

interface InputProps {
  type?: string;
  id?: string;
  name?: string;
  onInput: JSX.EventHandlerUnion<HTMLInputElement, InputEvent>;
  value: string;
  class?: string;
  error: string;
}

export const Input = (props: InputProps) => {
  return (
    <div>
      <TextFieldRoot>
        <TextField
          type={props.type}
          id={props.id}
          name={props.name}
          class={props.class}
          onInput={props.onInput}
          value={props.value}
        />
      </TextFieldRoot>
      <ErrorMessage message={props.error} />
    </div>
  );
};
