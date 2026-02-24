type ErrorState = {
  error?: Record<string, string[]>;
};

type ErrorProps<T extends ErrorState> = {
  state?: T;
  stateType: string;
};

const Error = <T extends ErrorState>({ state, stateType }: ErrorProps<T>) => {
  const messages = state?.error?.[stateType] ?? [];

  if (messages.length === 0) return null;

  return (
    <div>
      {messages.map((msg: string, i: number) => (
        <p key={i} className="text-red-400! font-semibold">
          {msg}
        </p>
      ))}
    </div>
  );
};

export default Error;
