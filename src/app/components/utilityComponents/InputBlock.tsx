type Props = {
  label: string;
  children: React.ReactNode;
};

const InputBlock = ({ label, children }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <p className="font-semibold pl-2">{label}</p>
      {children}
    </div>
  );
};

export default InputBlock;
