import { notFound } from "next/navigation";

import { cliSource, getLLMText } from "@/lib/source";

export const revalidate = false;

export const GET = async (
  _req: Request,
  { params }: RouteContext<"/llms.mdx/cli/[[...slug]]">
) => {
  const { slug } = await params;
  const page = cliSource.getPage(slug);
  if (!page) {
    notFound();
  }

  return new Response(await getLLMText(page), {
    headers: {
      "Content-Type": "text/markdown",
    },
  });
};

export const generateStaticParams = () => cliSource.generateParams();
