import { outro } from "@clack/prompts";

const REPO_URL = "https://github.com/Aniket-508/awesome-oss-perks";
const SPONSOR_URL = "https://github.com/sponsors/Aniket-508";

export const printCta = (): void => {
  if (!process.stdout.isTTY) {
    return;
  }

  outro(
    `If you find this useful, consider giving us a star \u2B50\n${REPO_URL}\n\nDonate / Sponsor:\n${SPONSOR_URL}`,
  );
};
