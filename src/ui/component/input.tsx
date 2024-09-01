import { TextFieldRoot, TextField } from "./base/textfield";

interface InputProps {
  type?: string;
  id?: string;
  name?: string;
  onInput: (value: string) => void;
  value: string;
  class?: string;
}

export const Input = (props: InputProps) => {
  return (
    <TextFieldRoot>
      <TextField
        type={props.type}
        id={props.id}
        name={props.name}
        class={props.class}
        onInput={({ currentTarget: { value } }) => {
          props.onInput(value);
        }}
        value={props.value}
      />
    </TextFieldRoot>
  );
};
