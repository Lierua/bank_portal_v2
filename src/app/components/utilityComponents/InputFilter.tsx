import type React from "react";

type InputProps = {
  dataInput: string;
  type: React.InputHTMLAttributes<HTMLInputElement>["type"];
  placeholder?: string;
  defaultValue?: string | number;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputFilter = ({
  dataInput,
  type,
  placeholder,
  defaultValue,
  value,
  onChange,
}: InputProps) => {
  return (
    <input
      data-input={dataInput}
      className="border-3 border-(--black)/20 mt-auto p-2 pl-5 w-full h-[40] rounded-[6] transition-all"
      type={type}
      placeholder={placeholder}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
    />
  );
};

export default InputFilter;
