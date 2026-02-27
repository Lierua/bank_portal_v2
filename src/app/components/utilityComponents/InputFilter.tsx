type InputProps = {
  dataInput: string;
  type: React.InputHTMLAttributes<HTMLInputElement>["type"];
  placeholder?: string;
  defaultValue?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputFilter = ({
  dataInput,
  type,
  placeholder,
  defaultValue,
  onChange,
}: InputProps) => {
  return (
    <input
      className={`border-3 border-(--black)/20 mt-auto p-2 pl-5 w-full h-[40px] rounded-[6] transition-allborder-(--white)
      `}
      type={type}
      placeholder={placeholder}
      defaultValue={defaultValue ?? ""}
      onChange={onChange}
    />
  );
};

export default InputFilter;
