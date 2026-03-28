import { $ } from "execa";

export const openUrl = async (url: string): Promise<void> => {
  const { platform } = process;

  if (platform === "darwin") {
    await $({ stdio: "ignore" })`open ${url}`;
    return;
  }

  if (platform === "win32") {
    const escapedUrl = url.replaceAll("&", "^&");
    await $({ stdio: "ignore" })`cmd /c start "" ${escapedUrl}`;
    return;
  }

  await $({ stdio: "ignore" })`xdg-open ${url}`;
};
