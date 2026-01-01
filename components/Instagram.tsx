// components/Instagram.tsx
"use client";

import { IconBrandInstagram } from "@tabler/icons-react";
import Link from "next/link";

const INSTAGRAM_URL = "https://www.instagram.com/caishencases?igsh=MWk4bTltaHF1NnQyNQ%3D%3D&utm_source=qr"; // Replace with your Instagram handle

export default function Instagram() {
  return (
    <div
      className="fixed z-40"
      style={{ bottom: 500, right: 24 }} // 70px above WhatsApp (110 + 70 = 180)
      aria-live="polite"
    >
      <Link
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow on Instagram"
        title="Follow on Instagram"
        data-cta="instagram-fab"
        data-channel="instagram"
        className="group relative inline-flex items-center justify-center"
      >
        {/* Ping ring */}
        <span className="absolute inset-0 rounded-xl ring-2 ring-pink-300/50 animate-ping" />

        {/* Button */}
        <span
          className="
            relative inline-flex h-12 w-12 items-center justify-center rounded-xl
            bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 text-white shadow-lg shadow-pink-500/20
            transition-all duration-300
            hover:translate-y-[-2px] hover:shadow-xl hover:shadow-pink-500/30
            active:translate-y-0
            focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2
          "
        >
          <IconBrandInstagram className="h-6 w-6" aria-hidden="true" />
        </span>
      </Link>
    </div>
  );
}
