import { TextFieldRoot, TextField } from "./base/textfield";

interface InputProps {
  type?: string;
  id?: string;
  name?: string;
  onInput: (value: string) => void;
  value: string;
}

export const Input = (props: InputProps) => {
  return (
    <TextFieldRoot>
      <TextField
        type={props.type}
        id={props.id}
        name={props.name}
        onInput={({ currentTarget: { value } }) => {
          props.onInput(value);
        }}
        value={props.value}
      />
    </TextFieldRoot>
  );
};
