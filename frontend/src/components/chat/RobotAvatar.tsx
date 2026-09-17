import React from "react";

interface RobotAvatarProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  animate?: boolean;
  variant?: "default" | "bare";
}

export function RobotAvatar({
  size = "md",
  className = "",
  animate = true,
  variant = "default",
}: RobotAvatarProps) {
  const dimensions = {
    sm: "w-8 h-8",
    md: "w-11 h-11",
    lg: "w-14 h-14",
    xl: "w-18 h-18",
  }[size];

  if (variant === "bare") {
    return (
      <div className={`relative inline-flex items-center justify-center shrink-0 ${dimensions} ${className}`}>
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-xs"
        >
          {/* Defs for gradients */}
          <defs>
            <linearGradient id="solarGradBare" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFC107" />
              <stop offset="1" stopColor="#FF8F00" />
            </linearGradient>
            <linearGradient id="visorGradBare" x1="16" y1="18" x2="48" y2="38" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0B2D5B" />
              <stop offset="1" stopColor="#1E3A8A" />
            </linearGradient>
            <linearGradient id="headGradBare" x1="12" y1="12" x2="52" y2="52" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" />
              <stop offset="1" stopColor="#F8FAFC" />
            </linearGradient>
          </defs>

          {/* Top Clean Energy Antenna */}
          <line x1="32" y1="13" x2="32" y2="5" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="32" cy="5" r="3.5" fill="#10B981">
            {animate && (
              <animate
                attributeName="opacity"
                values="1;0.4;1"
                dur="1.5s"
                repeatCount="indefinite"
              />
            )}
          </circle>

          {/* Golden Solar Ear Pods */}
          <rect x="6" y="24" width="5.5" height="14" rx="2.75" fill="url(#solarGradBare)" />
          <rect x="52.5" y="24" width="5.5" height="14" rx="2.75" fill="url(#solarGradBare)" />

          {/* Bright Pearl White Robot Head Body */}
          <rect
            x="11"
            y="12"
            width="42"
            height="40"
            rx="12"
            fill="url(#headGradBare)"
            stroke="#CBD5E1"
            strokeWidth="1.5"
          />

          {/* Solar Gold Forehead Band */}
          <path d="M22 13 H42" stroke="#FFC107" strokeWidth="3" strokeLinecap="round" />

          {/* High-Tech Gloss Visor Screen */}
          <rect
            x="16"
            y="19"
            width="32"
            height="19"
            rx="6"
            fill="url(#visorGradBare)"
          />

          {/* Friendly Glowing Solar Gold Eyes */}
          <ellipse cx="24.5" cy="28.5" rx="3.5" ry="4.5" fill="#FFC107">
            {animate && (
              <animate
                attributeName="ry"
                values="4.5;0.8;4.5"
                keyTimes="0;0.5;1"
                dur="3s"
                repeatCount="indefinite"
              />
            )}
          </ellipse>
          <ellipse cx="39.5" cy="28.5" rx="3.5" ry="4.5" fill="#FFC107">
            {animate && (
              <animate
                attributeName="ry"
                values="4.5;0.8;4.5"
                keyTimes="0;0.5;1"
                dur="3s"
                repeatCount="indefinite"
              />
            )}
          </ellipse>

          {/* Sparkle Reflection in Eyes */}
          <circle cx="23.5" cy="27" r="1.3" fill="#FFFFFF" />
          <circle cx="38.5" cy="27" r="1.3" fill="#FFFFFF" />

          {/* Cheerful Emerald Smile */}
          <path
            d="M26 44 C29 48 35 48 38 44"
            stroke="#10B981"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Cute Rosy Solar Cheeks */}
          <circle cx="19" cy="42" r="2.2" fill="#FDE68A" opacity="0.9" />
          <circle cx="45" cy="42" r="2.2" fill="#FDE68A" opacity="0.9" />
        </svg>
      </div>
    );
  }

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 rounded-2xl bg-gradient-to-tr from-amber-400 via-solar-500 to-yellow-300 p-0.5 shadow-sm ${dimensions} ${className}`}
    >
      <div className="w-full h-full rounded-[14px] bg-white flex items-center justify-center overflow-hidden p-0.5">
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Defs for gradients */}
          <defs>
            <linearGradient id="solarGrad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFC107" />
              <stop offset="1" stopColor="#FF8F00" />
            </linearGradient>
            <linearGradient id="visorGrad" x1="16" y1="18" x2="48" y2="38" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0B2D5B" />
              <stop offset="1" stopColor="#1E3A8A" />
            </linearGradient>
            <linearGradient id="headGrad" x1="12" y1="12" x2="52" y2="52" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" />
              <stop offset="1" stopColor="#F1F5F9" />
            </linearGradient>
          </defs>

          {/* Top Clean Energy Antenna */}
          <line x1="32" y1="13" x2="32" y2="5" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="32" cy="5" r="3.5" fill="#10B981">
            {animate && (
              <animate
                attributeName="opacity"
                values="1;0.4;1"
                dur="1.5s"
                repeatCount="indefinite"
              />
            )}
          </circle>

          {/* Golden Solar Ear Pods */}
          <rect x="6" y="24" width="5.5" height="14" rx="2.75" fill="url(#solarGrad)" />
          <rect x="52.5" y="24" width="5.5" height="14" rx="2.75" fill="url(#solarGrad)" />

          {/* Bright Pearl White Robot Head Body */}
          <rect
            x="11"
            y="12"
            width="42"
            height="40"
            rx="12"
            fill="url(#headGrad)"
            stroke="#E2E8F0"
            strokeWidth="1.5"
          />

          {/* Solar Gold Forehead Band */}
          <path d="M22 13 H42" stroke="#FFC107" strokeWidth="3" strokeLinecap="round" />

          {/* High-Tech Gloss Visor Screen */}
          <rect
            x="16"
            y="19"
            width="32"
            height="19"
            rx="6"
            fill="url(#visorGrad)"
          />

          {/* Friendly Glowing Solar Gold Eyes */}
          <ellipse cx="24.5" cy="28.5" rx="3.5" ry="4.5" fill="#FFC107">
            {animate && (
              <animate
                attributeName="ry"
                values="4.5;0.8;4.5"
                keyTimes="0;0.5;1"
                dur="3s"
                repeatCount="indefinite"
              />
            )}
          </ellipse>
          <ellipse cx="39.5" cy="28.5" rx="3.5" ry="4.5" fill="#FFC107">
            {animate && (
              <animate
                attributeName="ry"
                values="4.5;0.8;4.5"
                keyTimes="0;0.5;1"
                dur="3s"
                repeatCount="indefinite"
              />
            )}
          </ellipse>

          {/* Sparkle Reflection in Eyes */}
          <circle cx="23.5" cy="27" r="1.3" fill="#FFFFFF" />
          <circle cx="38.5" cy="27" r="1.3" fill="#FFFFFF" />

          {/* Cheerful Emerald Smile */}
          <path
            d="M26 44 C29 48 35 48 38 44"
            stroke="#10B981"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Cute Rosy Solar Cheeks */}
          <circle cx="19" cy="42" r="2.2" fill="#FDE68A" opacity="0.8" />
          <circle cx="45" cy="42" r="2.2" fill="#FDE68A" opacity="0.8" />
        </svg>
      </div>
    </div>
  );
}

