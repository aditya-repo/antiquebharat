export function LotusIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M20 4C17 10 14 12 10 13C14 14 17 16 20 22C23 16 26 14 30 13C26 12 23 10 20 4Z"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M20 8C18.5 12 16 13.5 13 14.5C16 15.5 18.5 17 20 21C21.5 17 24 15.5 27 14.5C24 13.5 21.5 12 20 8Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M20 12C19 14.5 18 15.5 16.5 16C18 16.5 19 17.5 20 20C21 17.5 22 16.5 23.5 16C22 15.5 21 14.5 20 12Z"
        fill="currentColor"
      />
      <line x1="20" y1="22" x2="20" y2="26" stroke="currentColor" strokeWidth="1" />
      <path
        d="M16 26H24"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}
