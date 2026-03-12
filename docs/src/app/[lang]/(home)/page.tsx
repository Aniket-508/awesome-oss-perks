import Link from "next/link";

import { withLocalePrefix } from "@/lib/i18n";

const CONTENT = {
  en: {
    description: "and see the documentation.",
    title: "Hello World",
  },
  es: {
    description: "y ver la documentacion.",
    title: "Hola Mundo",
  },
} as const;

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const content = lang === "es" ? CONTENT.es : CONTENT.en;

  return (
    <div className="flex flex-col justify-center text-center flex-1">
      <h1 className="text-2xl font-bold mb-4">{content.title}</h1>
      <p>
        You can open{" "}
        <Link
          href={withLocalePrefix(lang, "/docs")}
          className="font-medium underline"
        >
          /docs
        </Link>{" "}
        {content.description}
      </p>
    </div>
  );
}
