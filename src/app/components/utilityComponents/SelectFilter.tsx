type Props = {
  label: string;
  dataInput: string;
  options: string[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
};

const SelectFilter = ({
  label,
  dataInput,
  options,
  placeholder = "Vælg…",
  value,
  onChange,
}: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <p className="font-semibold pl-2">{label}</p>

      <select
        data-input={dataInput}
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        className="h-[40] rounded-md border border-(--black)/20 px-3"
      >
        <option value="" disabled>
          {placeholder}
        </option>

        <option value="">Alle</option>

        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectFilter;
