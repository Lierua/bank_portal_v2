type SuccessState = {
  success: boolean;
};

type SuccessProps<T extends SuccessState> = {
  state?: T;
  text: string;
};

const Success = <T extends SuccessState>({ state, text }: SuccessProps<T>) => {
  if (!state?.success) return null;

  return (
    <div>
      <p className="text-green-400 font-semibold text-sm text-center">{text}</p>
    </div>
  );
};

export default Success;
