"use client";

import { RootProvider as FumadocsRootProvider } from "fumadocs-ui/provider/next";
import { usePathname, useRouter } from "next/navigation";
import type { ComponentProps } from "react";
import { useCallback } from "react";

type FumadocsRootProviderProps = ComponentProps<typeof FumadocsRootProvider>;

export const RootProvider = ({
  i18n,
  children,
  ...rest
}: FumadocsRootProviderProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = i18n?.locale;

  const onLocaleChange = useCallback(
    (newLocale: string) => {
      const segments = pathname.split("/").filter((v) => v.length > 0);
      if (segments[0] === currentLocale) {
        segments[0] = newLocale;
      } else {
        segments.unshift(newLocale);
      }
      router.push(`/${segments.join("/")}${window.location.search}`);
    },
    [pathname, currentLocale, router]
  );

  return (
    <FumadocsRootProvider
      {...rest}
      i18n={i18n ? { ...i18n, onLocaleChange } : undefined}
    >
      {children}
    </FumadocsRootProvider>
  );
};
