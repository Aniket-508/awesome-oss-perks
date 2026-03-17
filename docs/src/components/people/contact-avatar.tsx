"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

import { getUnavatarUrl } from "@/lib/unavatar";

interface ContactAvatarProps {
  name: string;
  url?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  lg: "size-16",
  md: "size-12",
  sm: "size-10",
};

const sizePixels = {
  lg: 64,
  md: 48,
  sm: 40,
} as const;

const textSizeClasses = {
  lg: "text-xl",
  md: "text-lg",
  sm: "text-sm",
} as const;

export const ContactAvatar = ({
  name,
  url,
  size = "md",
  className = "",
}: ContactAvatarProps) => {
  const [imgFailed, setImgFailed] = useState(false);
  const initial = name.charAt(0).toUpperCase();
  const unavatarUrl = url && !imgFailed ? getUnavatarUrl(url) : null;

  const sizeClass = sizeClasses[size];
  const pixel = sizePixels[size];
  const textClass = textSizeClasses[size];

  const handleImgError = useCallback(() => setImgFailed(true), []);

  if (unavatarUrl) {
    return (
      <Image
        src={unavatarUrl}
        alt=""
        width={pixel}
        height={pixel}
        className={`${sizeClass} shrink-0 rounded-full object-cover ${className}`}
        onError={handleImgError}
      />
    );
  }

  return (
    <div
      className={`${sizeClass} flex shrink-0 items-center justify-center rounded-full bg-fd-muted text-fd-foreground font-semibold ${textClass} ${className}`}
    >
      {initial}
    </div>
  );
};
