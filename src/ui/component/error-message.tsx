import { Show } from "solid-js";

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = (props: ErrorMessageProps) => {
  return (
    <Show when={props.message?.length > 0}>
      <div class="text-red-500 text-sm mt-1">{props.message}</div>
    </Show>
  );
};
