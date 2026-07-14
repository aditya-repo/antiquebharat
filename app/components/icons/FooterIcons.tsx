export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

export function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.5l.5-3H13v-1.5c0-.8.4-1.5 1-1.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12.4 17.5c-.6-2.3-1.3-4.6-1-6.1.2-.9.9-1.5 1.7-1.4.7.1 1.1.8 1 1.6-.1.8-.5 1.9-.7 2.8-.2.8.1 1.5.8 1.7 1.1.3 2.2-.6 2.5-1.8.4-1.6-.1-3.4-1.5-4.4-1.7-1.2-4-.8-5.2.9-1 1.4-.9 3.4.1 4.7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2.5" y="6" width="19" height="12" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10.5 9.5v5l5-2.5-5-2.5Z" fill="currentColor" />
    </svg>
  );
}

/** Decorative painted elephant for the Stay Connected band. */
export function ElephantDecor({
  className,
  facing = "right",
}: {
  className?: string;
  facing?: "left" | "right";
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 180 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={facing === "left" ? { transform: "scaleX(-1)" } : undefined}
    >
      <ellipse cx="96" cy="118" rx="52" ry="48" fill="#8B6914" opacity="0.85" />
      <path
        d="M70 95c8-28 34-42 58-34 18 6 30 28 26 48-2 12-10 22-22 28"
        fill="#A67C2A"
      />
      <path
        d="M128 108c12 4 26 18 22 36-4 14-20 18-30 10"
        fill="#7A5A18"
      />
      <path
        d="M148 130c18 8 28 30 18 46-8 12-28 8-34-4"
        stroke="#5C4010"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
      <ellipse cx="78" cy="78" rx="28" ry="32" fill="#9A7420" />
      <circle cx="70" cy="72" r="3.5" fill="#2E1A12" />
      <path
        d="M58 88c-10 10-18 28-12 40 4 8 16 6 18-2"
        stroke="#5C4010"
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M62 58c12-16 30-14 38 0"
        stroke="#C9A84C"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M68 100h44c4 18-6 34-22 34s-26-16-22-34Z"
        fill="#6D2B2B"
      />
      <path
        d="M74 108h32M76 118h28M80 128h20"
        stroke="#C9A84C"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="90" cy="114" r="4" fill="#C9A84C" />
      <path d="M55 145v40M75 152v36M100 150v38M120 146v40" stroke="#5C4010" strokeWidth="7" strokeLinecap="round" />
      <path d="M48 184h20M68 186h20M92 186h22M112 184h22" stroke="#3D2317" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}
