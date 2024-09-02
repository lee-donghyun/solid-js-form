import {
  Checkbox as CheckboxRoot,
  CheckboxControl,
  CheckboxLabel,
} from "ui/component/base/checkbox";

interface CheckboxProps {
  checked: boolean;
  label: string;
  onChange: (checked: boolean) => void;
}

export const Checkbox = (props: CheckboxProps) => {
  return (
    <CheckboxRoot
      checked={props.checked}
      onChange={props.onChange}
      class="flex items-center space-x-2"
    >
      <CheckboxControl />
      <CheckboxLabel
        style={{ "margin-bottom": 0 }}
        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {props.label}
      </CheckboxLabel>
    </CheckboxRoot>
  );
};
