import React from "react";
import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  variant?: "horizontal" | "icon" | "dark" | "light" | "mono";
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ variant = "horizontal", className = "", size = "md" }: LogoProps) {
  const isDark = variant === "dark";

  // Height sizing
  const hPx = size === "sm" ? 40 : size === "lg" ? 64 : 54;
  const wPx = Math.round(hPx * 3.58);

  const heightClass =
    size === "sm"
      ? "h-9 sm:h-10"
      : size === "lg"
      ? "h-14 sm:h-16 lg:h-18"
      : "h-12 sm:h-14 lg:h-15";

  if (variant === "icon") {
    const iconSize = size === "sm" ? 36 : size === "lg" ? 56 : 46;
    return (
      <div className={`inline-flex items-center ${className}`}>
        <img
          src="/images/logo_icon.png"
          alt="J.I ENERGIES Icon"
          width={iconSize}
          height={iconSize}
          className="rounded-xl object-contain shadow-sm"
        />
      </div>
    );
  }

  return (
    <Link href="/" className={`group inline-flex items-center select-none ${className}`}>
      {isDark ? (
        /* In dark sections like Footer, place in a clean white rounded container so the original colors & text stand out vibrantly */
        <div className="bg-white/95 hover:bg-white px-3.5 py-2 rounded-2xl shadow-md transition-all">
          <img
            src="/images/logo.png"
            alt="J.I ENERGIES - Solar Energy & Power Solutions"
            width={wPx}
            height={hPx}
            className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      ) : (
        <img
          src="/images/logo.png"
          alt="J.I ENERGIES - Solar Energy & Power Solutions"
          width={wPx}
          height={hPx}
          className={`${heightClass} w-auto object-contain transition-transform duration-300 group-hover:scale-105`}
        />
      )}
    </Link>
  );
}
