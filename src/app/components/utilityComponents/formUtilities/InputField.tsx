type ErrorState = {
  error?: Record<string, string[]>;
};

type InputProps<T extends ErrorState> = {
  dataInput: string;
  type: React.InputHTMLAttributes<HTMLInputElement>["type"];
  placeholder?: string;
  defaultValue?: string | number;
  state?: T;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputField = <T extends ErrorState>({
  state,
  dataInput,
  type,
  placeholder,
  defaultValue,
  onChange,
}: InputProps<T>) => {
  const hasError = state?.error?.[dataInput];

  return (
    <input
      className={`border-3 mt-auto p-2 pl-5 w-full h-[60] rounded-2xl transition-all ${
        hasError ? "border-red-400" : "border-(--white)"
      }`}
      type={type}
      name={dataInput}
      placeholder={placeholder}
      defaultValue={defaultValue ?? ""}
      onChange={onChange}
    />
  );
};

export default InputField;
