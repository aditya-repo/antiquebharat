"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";

export type ArtisanMetaItem = {
  label: string;
  value: string;
  icon: ReactNode;
};

type ArtisanProfileIntroProps = {
  name: string;
  title: string;
  bio: string;
  verified: boolean;
  heroDecorImage?: string;
  meta: readonly ArtisanMetaItem[];
};

export function ArtisanProfileIntro({
  name,
  title,
  bio,
  verified,
  heroDecorImage,
  meta,
}: ArtisanProfileIntroProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="artisan-profile__intro">
      {heroDecorImage ? (
        <div className="artisan-profile__intro-decor" aria-hidden="true">
          <Image
            src={heroDecorImage}
            alt=""
            fill
            sizes="50vw"
            className="artisan-profile__intro-decor-image"
          />
        </div>
      ) : null}

      <div className="artisan-profile__intro-content">
        {verified ? (
          <span className="artisan-profile__badge">
            <svg
              className="artisan-profile__badge-icon"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="10"
                cy="10"
                r="8"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <path
                d="M6.5 10.2 8.8 12.5 13.5 7.5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Verified Artisan
          </span>
        ) : null}

        <h1 id="artisan-profile-title" className="artisan-profile__name">
          {name}
        </h1>
        <p className="artisan-profile__role">{title}</p>

        <div
          className={
            expanded
              ? "artisan-profile__bio-wrap is-expanded"
              : "artisan-profile__bio-wrap"
          }
        >
          <p className="artisan-profile__bio">{bio}</p>

          <ul
            className="artisan-profile__meta artisan-profile__meta--mobile"
            aria-label="Artisan details"
          >
            {meta.map((item) => (
              <li key={item.label} className="artisan-profile__meta-item">
                <span className="artisan-profile__meta-icon">{item.icon}</span>
                <span className="artisan-profile__meta-text">
                  <span className="artisan-profile__meta-label">
                    {item.label}
                  </span>
                  <span className="artisan-profile__meta-value">
                    {item.value}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          className="artisan-profile__view-more"
          aria-expanded={expanded}
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      </div>
    </div>
  );
}
