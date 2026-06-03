"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

export interface AdventoryProps {
  type: "banner" | "card";
  className?: string;
}

export const Adventory = ({ type = "banner", className }: AdventoryProps) => {
  const { resolvedTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    container.innerHTML = "";

    const script = document.createElement("script");
    script.src = `https://adventory.to/ad.${type}.js`;
    script.async = true;
    script.dataset.placement =
      type === "banner"
        ? "d90abdc1-6662-4330-a048-c534c0847c63"
        : "bb932bcc-5be9-47ed-85db-432d17a717c5";

    if (resolvedTheme === "dark") {
      script.dataset.theme = "dark";
    }

    container.append(script);

    return () => {
      container.innerHTML = "";
    };
  }, [resolvedTheme, type]);

  return <div ref={containerRef} className={cn("w-full", className)} />;
};
