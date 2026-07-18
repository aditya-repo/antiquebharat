"use client";

import { useState, type ReactNode } from "react";

type AccordionItem = {
  id: string;
  title: string;
  content?: string;
  children?: ReactNode;
};

type ProductAccordionsProps = {
  items: AccordionItem[];
};

export function ProductAccordions({ items }: ProductAccordionsProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="pdp-accordions">
      {items.map((item) => {
        const open = openId === item.id;
        return (
          <div
            key={item.id}
            className={`pdp-accordion${open ? " is-open" : ""}`}
          >
            <button
              type="button"
              className="pdp-accordion__trigger"
              aria-expanded={open}
              onClick={() => setOpenId(open ? null : item.id)}
            >
              <span>{item.title}</span>
              <span className="pdp-accordion__chevron" aria-hidden="true">
                ⌄
              </span>
            </button>
            {open ? (
              <div className="pdp-accordion__panel">
                {item.children ?? (item.content ? <p>{item.content}</p> : null)}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
