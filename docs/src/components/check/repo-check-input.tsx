"use client";

import { parseRepoUrl } from "@ossperks/core";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";

import { ROUTES } from "@/constants/routes";
import { withLocalePrefix } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface RepoCheckInputProps {
  lang: string;
  className?: string;
  compact?: boolean;
}

export const RepoCheckInput = ({
  lang,
  className,
  compact,
}: RepoCheckInputProps) => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    (e: FormEvent | KeyboardEvent) => {
      e.preventDefault();
      setError(null);

      const trimmed = value.trim();
      if (!trimmed) {
        return;
      }

      const ref = parseRepoUrl(trimmed);
      if (!ref) {
        setError("Please enter a valid GitHub or GitLab repository URL");
        return;
      }

      const path =
        `${ROUTES.CHECK}/${ref.provider}/${ref.owner}/${ref.repo}` as `/${string}`;
      router.push(withLocalePrefix(lang, path));
    },
    [lang, router, value]
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setError(null);
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("w-full max-w-xl mx-auto", className)}
    >
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-fd-muted-foreground" />
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Paste a GitHub or GitLab repo URL..."
          className={cn(
            "w-full rounded-lg border bg-fd-background pl-10 pr-4 text-sm text-fd-foreground placeholder:text-fd-muted-foreground focus:outline-none focus:ring-2 focus:ring-fd-primary/50 transition-shadow",
            compact ? "py-2" : "py-3",
            error ? "border-red-500" : "border-fd-border"
          )}
        />
      </div>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </form>
  );
};
