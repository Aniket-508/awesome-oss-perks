export const OG_DIMENSIONS = { height: 630, width: 1200 } as const;

export const OG_FONT_FAMILY = "Public Sans";

const fetchGoogleFont = async (weight: number): Promise<ArrayBuffer> => {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=Public+Sans:wght@${weight}`,
    {
      headers: {
        // Old UA to get TTF instead of WOFF2 — Satori requires TTF/OTF
        "User-Agent":
          "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
      },
    },
  ).then((res) => res.text());

  const url = css.match(/src: url\((.+?)\)/)?.[1];
  if (!url) {
    throw new Error(
      `Could not resolve Public Sans wght@${weight} from Google Fonts`,
    );
  }
  return fetch(url).then((res) => res.arrayBuffer());
};

/**
 * Load Public Sans TTF data for use with next/og ImageResponse.
 * Fetches Regular (400) and SemiBold (600) from Google Fonts.
 */
export const loadOgFonts = async () => {
  const [regular, semiBold] = await Promise.all([
    fetchGoogleFont(400),
    fetchGoogleFont(600),
  ]);
  return [
    {
      data: regular,
      name: OG_FONT_FAMILY,
      style: "normal" as const,
      weight: 400 as const,
    },
    {
      data: semiBold,
      name: OG_FONT_FAMILY,
      style: "normal" as const,
      weight: 600 as const,
    },
  ];
};
