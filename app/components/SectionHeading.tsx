import Link from "next/link";

import titleStrip from "@/app/assets/elements/title-strip.png";

type SectionHeadingProps = {
  title: string;
  titleId?: string;
  action?: {
    label: string;
    href: string;
  };
};

export function SectionHeading({ title, titleId, action }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <div className="section-heading__main">
        <img
          src={titleStrip.src}
          alt=""
          aria-hidden="true"
          className="section-heading__strip"
        />
        <h2 id={titleId} className="section-heading__title">
          {title}
        </h2>
        <img
          src={titleStrip.src}
          alt=""
          aria-hidden="true"
          className="section-heading__strip section-heading__strip--right"
        />
      </div>
      {action ? (
        <Link href={action.href} className="section-heading__action">
          {action.label}
        </Link>
      ) : null}
    </div>
  );
}
