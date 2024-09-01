import {
  Select as SelectRoot,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "ui/component/base/select";

interface SelectProps<V> {
  options: { label: string; value: V }[];
  value: V | null;
  onChange: (value: V | null) => void;
  placeholder?: string;
  allowClear?: boolean;
}
export const Select = <V extends string>(props: SelectProps<V>) => {
  const labelMap = () =>
    new Map(props.options.map((option) => [option.value, option.label]));

  return (
    <SelectRoot
      options={props.options.map((o) => o.value)}
      onChange={(v) => props.onChange(v)}
      value={props.value}
      placeholder={<span class="opacity-50">{props.placeholder}</span>}
      itemComponent={(itemProps) => (
        <SelectItem item={itemProps.item}>
          {labelMap().get(itemProps.item.rawValue)}
        </SelectItem>
      )}
    >
      <SelectTrigger>
        <SelectValue<V> class="w-full flex items-center justify-between pr-1">
          {(state) => (
            <>
              <div>{labelMap().get(state.selectedOption())}</div>
              {props.allowClear && (
                <button
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={() => state.clear()}
                  class="text-neutral-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="size-5"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent class="bg-white" />
    </SelectRoot>
  );
};
