type ButtonProps = {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
};

const ButtonOne = ({
  label,
  onClick,
  type = "button",
  className = "",
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        px-6 py-3 w-full bg-(--contrast) text-white rounded-full
        self-end mt-auto
        transition-all duration-100 ease-in
        hover:shadow-[inset_0_-30px_60px_-30px_var(--light-contrast)]
        ${className}
      `}
    >
      {label}
    </button>
  );
};

export default ButtonOne;
