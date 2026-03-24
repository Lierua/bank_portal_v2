type Props = React.SVGProps<SVGSVGElement>;

export default function BrugerIcon({ className, ...props }: Props) {
  return (
    <svg
      {...props}
      className={className}
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="14" cy="14" r="12.5" stroke="currentColor" stroke-width="3" />
      <path
        d="M14 14.5C18.8186 14.5 22.5 17.5198 22.5 21C22.5 24.4802 18.8186 27.5 14 27.5C9.18136 27.5 5.5 24.4802 5.5 21C5.5 17.5198 9.18136 14.5 14 14.5Z"
        fill="currentColor"
        stroke="currentColor"
      />
      <circle
        cx="14"
        cy="10"
        r="5.5"
        fill="currentColor"
        stroke="currentColor"
      />
    </svg>
  );
}
