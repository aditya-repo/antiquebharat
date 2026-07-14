export function MandalaIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="0.75" />
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="0.75" />
      <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="0.75" />
      <line x1="12" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="0.75" />
      <line x1="12" y1="12" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="0.75" />
      <line x1="12" y1="12" x2="12" y2="23" stroke="currentColor" strokeWidth="0.75" />
      <line x1="12" y1="12" x2="4.22" y2="19.78" stroke="currentColor" strokeWidth="0.75" />
      <line x1="12" y1="12" x2="1" y2="12" stroke="currentColor" strokeWidth="0.75" />
      <line x1="12" y1="12" x2="4.22" y2="4.22" stroke="currentColor" strokeWidth="0.75" />
      <line x1="12" y1="12" x2="12" y2="1" stroke="currentColor" strokeWidth="0.75" />
      <line x1="12" y1="12" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="0.75" />
      <circle cx="18.5" cy="12" r="1.2" fill="currentColor" />
      <circle cx="15.25" cy="17.63" r="1.2" fill="currentColor" />
      <circle cx="8.75" cy="17.63" r="1.2" fill="currentColor" />
      <circle cx="5.5" cy="12" r="1.2" fill="currentColor" />
      <circle cx="8.75" cy="6.37" r="1.2" fill="currentColor" />
      <circle cx="15.25" cy="6.37" r="1.2" fill="currentColor" />
    </svg>
  );
}
