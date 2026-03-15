import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { i18n, isLocale } from "@/lib/i18n";

export const proxy = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const segment = pathname.split("/").find(Boolean);
  const locale = segment && isLocale(segment) ? segment : i18n.defaultLanguage;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-next-locale", locale);

  if (segment && isLocale(segment)) {
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${i18n.defaultLanguage}${pathname}`;

  return NextResponse.rewrite(url, {
    request: { headers: requestHeaders },
  });
};

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon\\.ico|icon\\.svg|apple-icon\\.png|robots\\.txt|sitemap\\.xml|og|llms\\.txt|llms-full\\.txt|llms\\.mdx).*)",
  ],
};
