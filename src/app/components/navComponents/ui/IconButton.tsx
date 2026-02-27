export default function IconButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="text-3xl cursor-pointer hover:text-(--contrast) transition"
    >
      {children}
    </div>
  );
}
